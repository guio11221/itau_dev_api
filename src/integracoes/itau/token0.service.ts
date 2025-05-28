import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AutenticacaoDto } from './dtos/autenticacao.dto';
import axios from 'axios';
import * as https from 'https';

@Injectable()
export class TokenService {
  private auth: AutenticacaoDto;
  private tokenData: any;

  constructor(private readonly http: HttpService) {
    this.auth = new AutenticacaoDto({
      chave: '',
      cert: '',
      key: '',
      clientId: '',
      client_secret: '',
    });
  }

  /**
   * Obtém um token OAuth do Itaú.
   */
  async token() {
    try {
      const response = await axios.post(
        'https://sts.itau.com.br/api/oauth/token',
        new URLSearchParams({
          grant_type: 'client_credentials',
          client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
          client_id: this.auth.clientId,
          client_secret: this.auth.client_secret,
        }),
        {
          httpsAgent: new https.Agent({
            cert: this.auth.cert,
            key: this.auth.key,
          }),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      this.tokenData = response.data;
      return response.data;
    } catch (error) {
      throw new Error(
        `Erro ao obter token: ${error.response?.data?.error_description || error.message}`,
      );
    }
  }

  /**
   * Retorna o token armazenado.
   */
  getToken() {
    return this.tokenData;
  }
}
