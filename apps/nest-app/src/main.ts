import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { bearerAuth } from '@app/common/middlewares/auth.middleware';
import { CustomExceptionFilter } from '@app/common/custom-exception.filter';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({}));
  app.useGlobalFilters(new CustomExceptionFilter());
  app.use(bearerAuth);
  await app.listen(3000);
}
bootstrap();
