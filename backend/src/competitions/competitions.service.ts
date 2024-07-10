import { Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';

@Injectable()
export class CompetitionsService {
  constructor(private readonly prisma: DbService) {}

  async getAllCompetitions() {
    const competitions = await this.prisma.competition.findMany({
      where: {
        isPublic: true,
      },
      orderBy: {
        startDate: 'desc',
      },
    });
    const data = [];
    for (const comp of competitions) {
      const events = await this.prisma.competitionEvent.findMany({
        where: {
          competitionId: comp.id,
        },
      });
      data.push({
        id: comp.id,
        name: comp.name,
        events: events.map((event) => event.eventId),
        wcaWebsite: comp.wcaWebsite,
        wcaId: comp.wcaId,
        isPublic: comp.isPublic,
        startDate: comp.startDate,
        endDate: comp.endDate,
        registrationOpen: comp.registrationOpen,
        registrationClose: comp.registrationClose,
      });
    }

    const pastCompetitions = data.filter((comp) => {
      return comp.endDate < new Date();
    });

    const upcomingCompetitions = data.filter((comp) => {
      return comp.startDate >= new Date();
    });

    return {
      pastCompetitions,
      upcomingCompetitions,
    };
  }
}
