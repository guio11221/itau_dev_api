import { Module } from '@nestjs/common';
import { ProducaocaoController } from './producao.controller';
import { ProducaoService } from './producao.service';
import { PixModule } from './pix/pix.module';
import { QrcodeModule } from './qrcode/qrcode.module';
import { BolecodeModule } from './bolecode/bolecode.module';

@Module({
  controllers: [ProducaocaoController],
  providers: [ProducaoService],
  exports: [ProducaoService],
  imports: [PixModule, QrcodeModule, BolecodeModule],
})
export class ProducaoModule {}
