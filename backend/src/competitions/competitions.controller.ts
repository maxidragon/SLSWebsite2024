import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { CompetitionsService } from './competitions.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('competitions')
export class CompetitionsController {
  constructor(private readonly competitionsService: CompetitionsService) {}

  @Get()
  async getAllCompetitions() {
    return this.competitionsService.getAllCompetitions();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('sync/:id')
  async syncWcif(@Param('id') id: string) {
    return this.competitionsService.syncWcif(id);
  }
}
