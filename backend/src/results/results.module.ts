import { Module, forwardRef } from '@nestjs/common';
import { ResultsController } from './results.controller';
import { ResultsService } from './results.service';
import { WcaModule } from 'src/wca/wca.module';

@Module({
  imports: [forwardRef(() => WcaModule)],
  controllers: [ResultsController],
  providers: [ResultsService],
})
export class ResultsModule {}
