import { HttpException, Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { WcaService } from 'src/wca/wca.service';
import { UpdateCompetitionDto } from './dto/updateCompetition.dto';
import { CreateCompetitionDto } from './dto/createCompetition.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

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
      include: {
        CompetitionEvent: true,
      },
    });
    const data = this.mapCompetitions(competitions);

    const pastCompetitions = data.filter((comp) => {
      return (
        new Date(comp.endDate).getTime() < new Date().getTime() &&
        new Date(comp.endDate).getDate() !== new Date().getDate()
      );
    });

    const upcomingCompetitions = data
      .filter((comp) => {
        return (
          new Date(comp.endDate).getDate() === new Date().getDate() ||
          new Date(comp.endDate).getTime() >= new Date().getTime()
        );
      })
      .sort((a, b) => {
        return a.startDate - b.startDate;
      });

    return {
      pastCompetitions,
      upcomingCompetitions,
    };
  }

  async getAdminCompetitions() {
    const competitions = await this.prisma.competition.findMany({
      orderBy: {
        startDate: 'desc',
      },
      include: {
        CompetitionEvent: true,
      },
    });
    return this.mapCompetitions(competitions);
  }

  async deleteCompetition(id: string) {
    await this.prisma.competition.delete({
      where: { id },
    });
    return {
      message: 'Competition deleted',
    };
  }

  async deleteEvent(competitionId: string, eventId: string) {
    await this.prisma.competitionEvent.delete({
      where: {
        competitionId_eventId: {
          competitionId,
          eventId,
        },
      },
    });
    return {
      message: 'Event deleted',
    };
  }

  async createCompetition(data: CreateCompetitionDto) {
    return await this.prisma.competition.create({
      data: {
        wcaId: data.wcaId,
        name: data.name,
        isPublic: false,
      },
    });
  }

  async addEventToCompetition(competitionId: string, eventId: string) {
    try {
      await this.prisma.competitionEvent.create({
        data: {
          competitionId,
          eventId,
        },
      });
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new HttpException('Event already added', 409);
        }
      }
    }
    return {
      message: 'Event added',
    };
  }

  mapCompetitions(competitions) {
    return competitions.map((comp) => {
      return {
        id: comp.id,
        name: comp.name,
        events: comp.CompetitionEvent.map((event) => event.eventId),
        wcaWebsite: comp.wcaWebsite,
        wcaId: comp.wcaId,
        isPublic: comp.isPublic,
        startDate: comp.startDate,
        endDate: comp.endDate,
        registrationOpen: comp.registrationOpen,
        registrationClose: comp.registrationClose,
      };
    });
  }
  async getCompetitionById(id: string) {
    const competition = await this.prisma.competition.findUnique({
      where: { id },
      include: {
        CompetitionEvent: true,
      },
    });
    if (!competition) {
      throw new HttpException('Not found', 404);
    }

    return {
      id: competition.id,
      name: competition.name,
      events: competition.CompetitionEvent.map((event) => event.eventId),
      wcaWebsite: competition.wcaWebsite,
      wcaId: competition.wcaId,
      isPublic: competition.isPublic,
      startDate: competition.startDate,
      endDate: competition.endDate,
      registrationOpen: competition.registrationOpen,
      registrationClose: competition.registrationClose,
    };
  }

  async updateCompetition(id: string, data: UpdateCompetitionDto) {
    await this.prisma.competition.update({
      where: { id },
      data,
    });
    return {
      message: 'Competition updated',
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
        name: wcif.shortName,
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
