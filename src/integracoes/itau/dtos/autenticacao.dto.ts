import { IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class AutenticacaoDto {
  @IsString()
  @Transform(({ value }) => value?.trim())
  chave: string;

  @IsString()
  @Transform(({ value }) => value?.trim())
  cert: string;

  @IsString()
  @Transform(({ value }) => value?.trim())
  key: string;

  @IsString()
  @Transform(({ value }) => value?.trim())
  clientId: string;

  @IsString()
  @Transform(({ value }) => value?.trim())
  client_secret: string;

  constructor(data: Partial<AutenticacaoDto>) {
    Object.assign(this, data);
  }
}
