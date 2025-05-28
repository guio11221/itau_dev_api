import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HomologacaoController } from './homologacao/homologacao.controller';
import { HomologacaoModule } from './homologacao/homologacao.module';
import { ProducaoService } from './producao/producao.service';
import { ProducaoModule } from './producao/producao.module';
import { IntegracoesModule } from './integracoes/integracoes.module';

@Module({
  imports: [HomologacaoModule, ProducaoModule, IntegracoesModule],
  controllers: [AppController, HomologacaoController],
  providers: [AppService, ProducaoService],
})
export class AppModule {}