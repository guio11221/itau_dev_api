import { Injectable } from '@nestjs/common';
import { AutenticacaoConfigService } from './autenticacao.config.service';
import { FileLoggerService } from './logger.service';
import * as https from 'https';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { URLSearchParams } from 'url';

interface TokenData {
  token: string;
  expiresIn: number;
  timestamp: number;
}

@Injectable()
export class TokenService {
  private tokenData: TokenData | null = null;

  constructor(
    private readonly authConfigService: AutenticacaoConfigService,
    private readonly logger: FileLoggerService,
    private readonly httpService: HttpService,
  ) {}

  private isTokenValido(): boolean {
    if (!this.tokenData) return false;
    const elapsedSeconds = (Date.now() - this.tokenData.timestamp) / 1000;

    return elapsedSeconds < this.tokenData.expiresIn - 30;
  }

  private async gerarNovoToken(): Promise<void> {
    const auth = this.authConfigService.obterConfig();

    const params = new URLSearchParams({
      grant_type: 'client_credentials',
      client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
      client_id: auth.clientId,
      client_secret: auth.clientSecret,
    });

    const httpsAgent = new https.Agent({ cert: auth.cert, key: auth.key });

    try {
      const response$ = this.httpService.post(
        'https://sts.itau.com.br/api/oauth/token',
        params.toString(),
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          httpsAgent,
        },
      );

      const response = await lastValueFrom(response$);

      this.tokenData = {
        token: response.data.access_token,
        expiresIn: response.data.expires_in,
        timestamp: Date.now(),
      };

      this.logger.log('Novo token gerado com sucesso.');
    } catch (error: any) {
      const msg =
        error?.response?.data?.error_description ||
        error?.message ||
        'Erro desconhecido ao gerar token';
      this.logger.error(`Erro ao gerar token: ${msg}`);
      throw new Error(`Erro ao gerar token: ${msg}`);
    }
  }

  async getToken(): Promise<string> {
    if (!this.isTokenValido()) {
      this.logger.log('Token expirado ou inexistente, gerando novo token...');
      await this.gerarNovoToken();
    }
    return this.tokenData.token;
  }
}
