import { Controller, Get, Param, Query } from '@nestjs/common';
import { ResultsService } from './results.service';

@Controller('results')
export class ResultsController {
  constructor(private readonly resultsService: ResultsService) {}

  @Get(':competitionId')
  async loadResultFromCompetition(
    @Param('competitionId') competitionId: string,
    @Query('eventId') eventId: string,
  ) {
    return this.resultsService.getResultsFromWcaWebsite(competitionId, eventId);
  }
}
