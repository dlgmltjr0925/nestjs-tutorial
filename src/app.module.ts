import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';

import { APP_FILTER } from '@nestjs/core';
import { AccountController } from './account/account.controller';
import { AdminController } from './admin/admin.controller';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { CatsModule } from './cats/cats.module';
import { HttpExceptionFilter } from './common/exception/http-exception.filter';
import { logger } from './common/middleware/logger.middleware';

@Module({
  imports: [CatsModule],
  controllers: [AppController, AdminController, AccountController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(logger).forRoutes(CatsController);
  }
}
