import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { PixService } from './pix.service';

@Controller('producao')
export class PixController {
  constructor(private readonly pixService: PixService) {}

  @Get('pix')
  async consultaPix(
    @Query('chave') chave: string,
    @Query('txid') txid: string,
  ): Promise<any> {
    if (!chave || !txid) {
      throw new BadRequestException('Chave e txid são obrigatórios na query');
    }
    return this.pixService.consultaPixPorTxid(chave, txid);
  }
}
