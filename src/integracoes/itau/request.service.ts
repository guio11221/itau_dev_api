import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as https from 'https';
import { TokenService } from './token0.service';

@Injectable()
export class RequestRouterService {
  private readonly baseURL = 'https://secure.api.itau/pix_recebimentos/v2';
  private readonly chave: string;
  private readonly httpsAgent: https.Agent;

  constructor(
    private readonly tokenService: TokenService,
    config: { chave: string; cert: any; key: any },
  ) {
    const { chave, cert, key } = config;
    this.chave = chave;
    this.httpsAgent = new https.Agent({ cert, key });
  }

  private async request(method: string, route: string, data: any = {}) {
    const token = await this.tokenService.getToken();  
    const response = await axios({
      method,
      url: `${this.baseURL}${route}`,
      data,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      httpsAgent: this.httpsAgent,
    });

    return response.data;
  }

  get(route: string) {
    return this.request('GET', route);
  }

  post(route: string, data: any) {
    return this.request('POST', route, data);
  }

  put(route: string, data: any) {
    return this.request('PUT', route, data);
  }

  patch(route: string, data: any) {
    return this.request('PATCH', route, data);
  }

  delete(route: string) {
    return this.request('DELETE', route);
  }
}
