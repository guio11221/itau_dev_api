import { Module } from '@nestjs/common';
import { PixService } from './pix.service';
import { TokenService } from './token0.service';

@Module({
  providers: [PixService, TokenService]
})
export class ItauModule {}