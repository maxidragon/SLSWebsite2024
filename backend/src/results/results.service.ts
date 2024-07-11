import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { WcaService } from 'src/wca/wca.service';

@Injectable()
export class ResultsService {
  constructor(
    private readonly prisma: DbService,
    private readonly wcaService: WcaService,
  ) {}

  async getResultsFromWcaWebsite(id: string, eventId?: string) {
    const competition = await this.prisma.competition.findUnique({
      where: {
        id: id,
      },
    });

    if (competition) {
      const wcif = await this.wcaService.getPublicWcif(competition.wcaId);
      for (const event of wcif.events) {
        await this.prisma.competitionEvent.upsert({
          create: {
            competition: {
              connect: {
                id: competition.id,
              },
            },
            eventId: event.id,
          },
          update: {},
          where: {
            competitionId_eventId: {
              competitionId: competition.id,
              eventId: event.id,
            },
          },
        });
      }
      for (const person of wcif.persons) {
        const competitor = await this.prisma.competitor.findFirst({
          where: {
            wcaId: person.wcaId,
          },
        });
        if (!competitor) {
          await this.prisma.competitor.create({
            data: {
              wcaId: person.wcaId || null,
              name: person.name,
              countryIso2: person.countryIso2,
              avatarUrl: person.avatar?.is_default ? null : person.avatar?.url,
            },
          });
        } else {
          await this.prisma.competitor.update({
            where: {
              id: competitor.id,
            },
            data: {
              name: person.name,
              countryIso2: person.countryIso2,
              avatarUrl: person.avatar?.is_default ? null : person.avatar?.url,
            },
          });
        }
      }
      if (eventId) {
        await this.createResultsForEvent(
          wcif,
          competition,
          wcif.events.find((event) => event.id === eventId),
        );
      } else {
        for (const eventInfo of wcif.events) {
          await this.createResultsForEvent(wcif, competition, eventInfo);
        }
      }
    } else {
      throw new NotFoundException('Competition not found');
    }
  }

  async createResultsForEvent(wcif: any, comp: any, event: any) {
    event.rounds.sort((a, b) => {
      return b.id.localeCompare(a.id);
    });
    for (const round of event.rounds) {
      for (const result of round.results) {
        const person = wcif.persons.find(
          (person) => person.registrantId === result.personId,
        );
        const competitor = await this.prisma.competitor.findFirst({
          where: {
            wcaId: person.wcaId,
          },
        });
        if (competitor) {
          const dbResult = await this.prisma.result.findFirst({
            where: {
              competitionId: comp.id,
              competitorId: competitor.id,
              eventId: event.id,
            },
          });
          if (!dbResult) {
            try {
              await this.prisma.result.create({
                data: {
                  competitor: {
                    connect: {
                      id: competitor.id,
                    },
                  },
                  competition: {
                    connect: {
                      id: comp.id,
                    },
                  },
                  eventId: event.id,
                  pos: result.ranking,
                  best: result.best,
                  average: result.average,
                },
              });
            } catch (err) {
              console.log(err);
            }
          }
        }
      }
    }
  }
}
