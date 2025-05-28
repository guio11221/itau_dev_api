import { Module } from '@nestjs/common';
import { HomologacaoController } from './homologacao.controller';
import { HomologacaoService } from './homologacao.service';
import { PixController } from './pix/pix.controller';
import { PixService } from './pix/pix.service';
import { QrcodeController } from './qrcode/qrcode.controller';
import { QrcodeService } from './qrcode/qrcode.service';
import { QrcodeModule } from './qrcode/qrcode.module';
import { BolecodeModule } from './bolecode/bolecode.module';

@Module({
  controllers: [HomologacaoController, PixController, QrcodeController],
  providers: [HomologacaoService, PixService, QrcodeService],
  exports: [HomologacaoService],
  imports: [QrcodeModule, BolecodeModule],
})
export class HomologacaoModule {}
