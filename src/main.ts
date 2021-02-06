import { HttpAdapterHost, NestFactory } from '@nestjs/core';

import { AllExceptionsFilter } from './common/exception/all-exceptions.filter';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/exception/http-exception.filter';
import { LoggingInterceptor } from './common/interceptor/logging.interceptor';
import { NestExpressApplication } from '@nestjs/platform-express';
import { RolesGuard } from './common/guard/roles.guard';
import { ValidationPipe } from '@nestjs/common';
import { logger } from './common/middleware/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(logger);
  // app.useGlobalFilters(new HttpExceptionFilter());

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  // app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalGuards(new RolesGuard());
  // app.useGlobalInterceptors(new LoggingInterceptor());

  await app.listen(3000);
}
bootstrap();
