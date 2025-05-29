import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProducaocaoController } from './producao/producao.controller';
import { ProducaoModule } from './producao/producao.module';
import { IntegracoesModule } from './integracoes/integracoes.module';

@Module({
  imports: [ProducaoModule, IntegracoesModule],
  controllers: [AppController, ProducaocaoController],
  providers: [AppService],
  
})
export class AppModule {}