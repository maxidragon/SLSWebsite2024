import { Module } from '@nestjs/common';
import { CompetitionsService } from './competitions.service';
import { CompetitionsController } from './competitions.controller';
import { WcaModule } from 'src/wca/wca.module';

@Module({
  imports: [WcaModule],
  providers: [CompetitionsService],
  controllers: [CompetitionsController],
})
export class CompetitionsModule {}
