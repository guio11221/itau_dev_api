import { Controller, Get } from '@nestjs/common';
import { PixService } from './pix.service';

@Controller('homologacao')
export class PixController {
  constructor(private readonly pixService: PixService) {}
  @Get('pix')
  getHello(): string {
    return this.pixService.getHello();
  }
}
