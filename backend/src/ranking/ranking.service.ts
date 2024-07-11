import { Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';

const SCORE_FOR_POSITION = [
  0, 200, 175, 150, 130, 110, 100, 90, 80, 70, 60, 55, 50, 45, 40, 35, 30, 25,
  20, 15, 10,
];

@Injectable()
export class RankingService {
  constructor(private readonly prisma: DbService) {}

  async generateRanking() {
    const results = await this.prisma.result.findMany({
      include: {
        competitor: true,
      },
    });
    const ranking = [];
    const includedResults = results.filter((result) =>
      this.resultIncluded(result),
    );
    for (const result of includedResults) {
      const competitor = ranking.find(
        (r) => r.competitor.id === result.competitor.id,
      );
      if (competitor) {
        competitor.score += SCORE_FOR_POSITION[result.pos];
      } else {
        ranking.push({
          competitor: result.competitor,
          score: SCORE_FOR_POSITION[result.pos],
        });
      }
    }
    ranking.sort((a, b) => b.score - a.score);
    return ranking;
  }

  async getPersonInfo(wcaId: string) {
    const person = await this.prisma.competitor.findFirst({
      where: {
        wcaId,
      },
    });
    const results = await this.prisma.result.findMany({
      where: {
        competitor: {
          id: person.id,
        },
      },
      include: {
        competition: true,
      },
    });
    const allCompetitions = await this.prisma.competition.findMany({
      orderBy: {
        startDate: 'desc',
      },
    });
    const resultsByCompetition = [];
    for (const competition of allCompetitions) {
      const competitionResults = results.filter(
        (result) => result.competition.id === competition.id,
      );
      if (competitionResults.length > 0) {
        resultsByCompetition.push({
          competition,
          results: competitionResults.map((result) => ({
            id: result.id,
            eventId: result.eventId,
            pos: result.pos,
            best: result.best,
            average: result.average,
            score: this.resultIncluded(result)
              ? SCORE_FOR_POSITION[result.pos]
              : 0,
          })),
        });
      }
    }
    return {
      person,
      resultsByCompetition: resultsByCompetition.map((result) => {
        return {
          ...result,
          score: result.results.reduce((acc, r) => acc + r.score, 0),
        };
      }),
    };
  }

  private resultIncluded(result) {
    return result.best !== -1 && result.best !== -2 && result.pos <= 20;
  }
}
