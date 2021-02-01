import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import { logger } from './common/middleware/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(logger);
  await app.listen(3000);
}
bootstrap();
