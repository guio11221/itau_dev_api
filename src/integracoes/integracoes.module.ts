import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PixService } from './itau/pix.service';
import { TokenService } from './itau/token0.service';
import { ScheduleModule } from '@nestjs/schedule';
import { ItauModule } from './itau/itau.module';  

@Module({
  imports: [HttpModule, ScheduleModule.forRoot(), ItauModule],
  providers: [PixService, TokenService],
  exports: [PixService, TokenService],
})
export class IntegracoesModule {}