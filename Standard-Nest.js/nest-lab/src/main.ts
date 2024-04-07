import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { CustomExceptionFilter } from './exceptionFilters/custom-exception.filter';
import { bearerAuth } from './middlewares/auth.middleware';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({}));
  app.useGlobalFilters(new CustomExceptionFilter());
  app.use(bearerAuth);
  await app.listen(3000);
}
bootstrap();
