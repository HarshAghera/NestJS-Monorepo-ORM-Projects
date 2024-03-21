import { Module } from '@nestjs/common';
import { NestProjectController } from './nest-project.controller';
import { NestProjectService } from './nest-project.service';

@Module({
  imports: [],
  controllers: [NestProjectController],
  providers: [NestProjectService],
})
export class NestProjectModule {}
