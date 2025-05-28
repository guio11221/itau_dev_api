import { Module } from '@nestjs/common';
import { BolecodeController } from './bolecode.controller';

@Module({
  controllers: [BolecodeController]
})
export class BolecodeModule {}
