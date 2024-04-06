import { Injectable } from '@nestjs/common';

@Injectable()
export class NestProjectService {
  getHello(): string {
    return 'Hello World!';
  }
}
