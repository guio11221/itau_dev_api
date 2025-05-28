import { Module } from '@nestjs/common';
import { BolecodeController } from './bolecode.controller';
import { BolecodeService } from './bolecode.service';

@Module({
  controllers: [BolecodeController],
  providers: [BolecodeService]
})
export class BolecodeModule {}
