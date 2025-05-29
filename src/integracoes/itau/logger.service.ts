import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FileLoggerService {
  private readonly logger = new Logger(FileLoggerService.name);
  private readonly logFile: string;

  constructor() {
    const tempPath = path.resolve('temp');
    if (!fs.existsSync(tempPath)) fs.mkdirSync(tempPath);
    this.logFile = path.resolve(tempPath, 'itau.log');
  }

  log(message: string) {
    const logMsg = `[${new Date().toISOString()}] ${message}\n`;
    fs.appendFileSync(this.logFile, logMsg);
    this.logger.log(message);
  }

  error(message: string) {
    const logMsg = `[${new Date().toISOString()}] ERROR: ${message}\n`;
    fs.appendFileSync(this.logFile, logMsg);
    this.logger.error(message);
  }
}
