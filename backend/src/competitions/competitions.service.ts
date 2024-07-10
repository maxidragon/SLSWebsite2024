import { HttpException, Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { WcaService } from 'src/wca/wca.service';

@Injectable()
export class CompetitionsService {
  constructor(
    private readonly prisma: DbService,
    private readonly wcaService: WcaService,
  ) {}

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

    const upcomingCompetitions = data
      .filter((comp) => {
        return comp.startDate >= new Date();
      })
      .sort((a, b) => {
        return a.startDate - b.startDate;
      });

    return {
      pastCompetitions,
      upcomingCompetitions,
    };
  }

  async syncWcif(id: string) {
    const competition = await this.prisma.competition.findUnique({
      where: { id },
    });

    if (!competition) {
      throw new HttpException('Not found', 404);
    }

    const wcif = await this.wcaService.getPublicWcif(competition.wcaId);
    const endDate = new Date(wcif.schedule.startDate);
    if (wcif.schedule.numberOfDays > 1) {
      endDate.setDate(endDate.getDate() + wcif.schedule.numberOfDays);
    }
    await this.prisma.competition.update({
      where: { id },
      data: {
        name: wcif.name,
        registrationOpen: new Date(wcif.registrationInfo.openTime),
        registrationClose: new Date(wcif.registrationInfo.closeTime),
        startDate: new Date(wcif.schedule.startDate),
        endDate: endDate,
      },
    });

    await this.prisma.competitionEvent.deleteMany({
      where: {
        competitionId: competition.id,
      },
    });
    await this.prisma.competitionEvent.createMany({
      data: wcif.events.map((wcifEvent) => ({
        competitionId: competition.id,
        eventId: wcifEvent.id,
      })),
    });
    return {
      message: 'Events imported',
    };
  }
}
