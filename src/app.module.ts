import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';

import { AccountController } from './account/account.controller';
import { AdminController } from './admin/admin.controller';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { LoggerMiddleWare } from './common/middleware/logger.middleware';

@Module({
  imports: [CatsModule],
  controllers: [AppController, AdminController, AccountController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleWare).forRoutes({
      path: 'cats',
      method: RequestMethod.GET,
    });
  }
}
