import { Controller, Get } from '@nestjs/common';
import { CompetitionsService } from './competitions.service';

@Controller('competitions')
export class CompetitionsController {
  constructor(private readonly competitionsService: CompetitionsService) {}

  @Get()
  async getAllCompetitions() {
    return this.competitionsService.getAllCompetitions();
  }
}
