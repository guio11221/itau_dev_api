import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PixService } from './itau/pix.service';
import { TokenService } from './itau/token0.service';

@Module({
  imports: [HttpModule],
  providers: [PixService, TokenService],
  exports: [PixService, TokenService],
})
export class IntegracoesModule {}
