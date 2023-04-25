import { NestFactory } from '@nestjs/core';
import { AppModule } from './Nest/app.module';
import { ValidationPipe } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ExceptionHandler } from './Nest/exception.handler';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  app.useGlobalFilters(new ExceptionHandler());

  await app.listen(3002, '0.0.0.0');
}
bootstrap();
