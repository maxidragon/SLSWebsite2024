import { Controller, Get, Param } from '@nestjs/common';
import { RankingService } from './ranking.service';

@Controller('ranking')
export class RankingController {
  constructor(private readonly rankingService: RankingService) {}

  @Get()
  async getRanking() {
    return this.rankingService.generateRanking();
  }

  @Get('person/:wcaId')
  async getPersonInfo(@Param('wcaId') wcaId: string) {
    return this.rankingService.getPersonInfo(wcaId);
  }
}
