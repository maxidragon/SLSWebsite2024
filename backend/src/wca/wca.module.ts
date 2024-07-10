import { Module } from '@nestjs/common';
import { WcaService } from './wca.service';
import { WcaController } from './wca.controller';

@Module({
  providers: [WcaService],
  controllers: [WcaController]
})
export class WcaModule {}
