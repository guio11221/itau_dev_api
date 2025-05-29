import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as dotenv from 'dotenv';
dotenv.config();

export interface AutenticacaoConfig {
  chave: string;
  cert: Buffer;
  key: Buffer;
  clientId: string;
  clientSecret: string;
}

@Injectable()
export class AutenticacaoConfigService {
  constructor() {}

  obterConfig(): AutenticacaoConfig {
    if (
      !process.env.ITAU_CERT_PATH ||
      !process.env.ITAU_KEY_PATH ||
      !process.env.ITAU_CHAVE ||
      !process.env.ITAU_CLIENT_ID ||
      !process.env.ITAU_CLIENT_SECRET
    ) {
      throw new Error('Variáveis de ambiente de autenticação não configuradas.');
    }

    return {
      chave: process.env.ITAU_CHAVE,
      cert: fs.readFileSync(process.env.ITAU_CERT_PATH),
      key: fs.readFileSync(process.env.ITAU_KEY_PATH),
      clientId: process.env.ITAU_CLIENT_ID,
      clientSecret: process.env.ITAU_CLIENT_SECRET,
    };
  }
}
