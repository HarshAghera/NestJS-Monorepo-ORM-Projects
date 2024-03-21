import { Controller, Get } from '@nestjs/common';
import { NestProjectService } from './nest-project.service';

@Controller()
export class NestProjectController {
  constructor(private readonly nestProjectService: NestProjectService) {}

  @Get()
  getHello(): string {
    return this.nestProjectService.getHello();
  }
}
