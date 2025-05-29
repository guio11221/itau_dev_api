import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { RequestRouterService } from 'src/integracoes/itau/request.service';

@Injectable()
export class PixService {
  private readonly logger = new Logger(PixService.name);

  constructor(private readonly requestRouterService: RequestRouterService) {}

  async consultaPixPorTxid(chave: string, txid: string): Promise<any> {
    this.logger.log(`Consultando PIX pelo txid: ${txid}`);

    try {
      return await this.requestRouterService.get(`/cobv/${txid}`);
    } catch (error) {
      this.logger.error('Erro ao consultar PIX', error);

      if (error.response?.data) {
        throw new HttpException(
          error.response.data.message || 'Erro desconhecido',
          error.response.status || HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      throw new HttpException(
        'Erro interno ao consultar PIX',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
