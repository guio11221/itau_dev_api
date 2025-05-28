import { Module } from '@nestjs/common';
import { ProducaoController } from './producao.controller';
import { PixController } from './pix/pix.controller';
import { PixService } from './pix/pix.service';
import { PixModule } from './pix/pix.module';
import { QrcodeModule } from './qrcode/qrcode.module';
import { BolecodeService } from './bolecode/bolecode.service';
import { BolecodeModule } from './bolecode/bolecode.module';

@Module({
  controllers: [ProducaoController, PixController],
  providers: [PixService, BolecodeService],
  imports: [PixModule, QrcodeModule, BolecodeModule]
})
export class ProducaoModule {}
