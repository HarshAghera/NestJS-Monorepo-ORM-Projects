import { NestFactory } from '@nestjs/core';
import { NestProjectModule } from './nest-project.module';

async function bootstrap() {
  const app = await NestFactory.create(NestProjectModule);
  await app.listen(3000);
}
bootstrap();
