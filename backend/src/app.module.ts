import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DbModule } from './db/db.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { WcaModule } from './wca/wca.module';
import { CompetitionsModule } from './competitions/competitions.module';
import { ResultsModule } from './results/results.module';
import { RankingModule } from './ranking/ranking.module';

@Module({
  imports: [
    DbModule,
    AuthModule,
    UserModule,
    WcaModule,
    CompetitionsModule,
    ResultsModule,
    RankingModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
