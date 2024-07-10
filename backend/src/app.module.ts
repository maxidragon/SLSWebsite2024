import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DbModule } from './db/db.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { WcaModule } from './wca/wca.module';

@Module({
  imports: [DbModule, AuthModule, UserModule, WcaModule],
  controllers: [AppController],
})
export class AppModule {}
