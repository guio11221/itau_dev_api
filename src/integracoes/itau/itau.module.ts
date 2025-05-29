import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PixService } from './pix.service';
import { TokenService } from './token0.service';
import { AutenticacaoConfigService } from './autenticacao.config.service';
import { FileLoggerService } from './logger.service';

@Module({
  imports: [HttpModule],
  providers: [PixService, TokenService, AutenticacaoConfigService, FileLoggerService],
  exports: [PixService, TokenService, AutenticacaoConfigService, FileLoggerService],
})
export class ItauModule {}
  