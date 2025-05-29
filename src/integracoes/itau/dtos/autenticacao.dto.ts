import { IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class AutenticacaoDto {
  @IsString()
  @Transform(({ value }) => value?.trim())
  chave: any;

  @IsString()
  @Transform(({ value }) => value?.trim())
  cert: any;

  @IsString()
  @Transform(({ value }) => value?.trim())
  key: any;

  @IsString()
  @Transform(({ value }) => value?.trim())
  clientId: any;

  @IsString()
  @Transform(({ value }) => value?.trim())
  client_secret: any;

  constructor(data: Partial<AutenticacaoDto>) {
    Object.assign(this, data);
  }
}
