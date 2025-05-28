import { Injectable } from '@nestjs/common';

@Injectable()
export class PixService {
  getHello(): string {
    return 'Hello World!';
  }
}
