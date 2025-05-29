import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PixController } from './pix.controller';
import { TokenService } from 'src/integracoes/itau/token0.service';
import { RequestRouterService } from 'src/integracoes/itau/request.service';
import * as fs from 'fs';
import * as dotenv from 'dotenv';
import { IntegracoesModule } from 'src/integracoes/integracoes.module';
import { ItauModule } from 'src/integracoes/itau/itau.module';
import { PixService } from './pix.service';
dotenv.config();

const requestRouterProvider = {
  provide: RequestRouterService,
  useFactory: (tokenService: TokenService) => {
    const certPath = process.env.ITAU_CERT_PATH;
    const keyPath = process.env.ITAU_KEY_PATH;
    const chave = process.env.ITAU_CHAVE;

    if (!certPath || !keyPath || !chave) {
      throw new Error(
        'Variáveis de ambiente ITAU_CERT_PATH, ITAU_KEY_PATH e ITAU_CHAVE são obrigatórias',
      );
    }

    const cert = fs.readFileSync(certPath);
    const key = fs.readFileSync(keyPath);

    return new RequestRouterService(tokenService, { chave, cert, key });
  },
  inject: [TokenService],
};

@Module({
  imports: [HttpModule, IntegracoesModule, ItauModule],  
  controllers: [PixController],
  providers: [requestRouterProvider, PixService],
  exports: [RequestRouterService],
})
export class PixModule {}
