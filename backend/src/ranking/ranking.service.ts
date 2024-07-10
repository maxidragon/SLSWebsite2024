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
    const includedResults = results.filter(
      (result) => result.best !== -1 && result.best !== -2 && result.pos <= 20,
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
}
