import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ResultsService } from './results.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('results')
export class ResultsController {
  constructor(private readonly resultsService: ResultsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async loadResultFromCompetition(
    @Param('id') id: string,
    @Query('eventId') eventId: string,
  ) {
    return this.resultsService.getResultsFromWcaWebsite(id, eventId);
  }
}
