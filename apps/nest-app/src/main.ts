import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { bearerAuth } from './middlewares/auth.middleware';
import * as dotenv from 'dotenv';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  dotenv.config();
  app.useGlobalPipes(new ValidationPipe({}));
  app.use(bearerAuth);
  await app.listen(3000);
}
bootstrap();
