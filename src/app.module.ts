import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  Provider,
  ValidationPipe,
} from '@nestjs/common';

import { AccountController } from './account/account.controller';
import { AdminController } from './admin/admin.controller';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { CatsModule } from './cats/cats.module';
import { CatsService } from './cats/cats.service';
import { ConfigService } from './config/config.service';
import { DevelopmentConfigService } from './config/development-config.service';
import { HttpExceptionFilter } from './common/exception/http-exception.filter';
import { LoggerService } from './logger/logger.service';
import { LoggingInterceptor } from './common/interceptor/logging.interceptor';
import { ProductionConfigService } from './config/production-config.service';
import { RolesGuard } from './common/guard/roles.guard';
import { UsersController } from './users/users.controller';
import { logger } from './common/middleware/logger.middleware';

const mockCatsService = {
  /* mock implementation
  ...
  */
};

const connection = {
  /* implementation
  ...
  */
};

const configServiceProvider: Provider = {
  provide: ConfigService,
  useClass:
    process.env.NODE_ENV === 'development'
      ? DevelopmentConfigService
      : ProductionConfigService,
};

interface Options {
  host: string;
}
class OptionsProvider {
  host: string;

  get() {
    return {
      host: '',
    };
  }
}

class DatabaseConnection {
  options: Options;
  constructor(options: Options) {
    this.options = options;
  }
}

// const connectionFactory: Provider = {
//   provide: 'CONNECTION',
//   useFactory: (optionsProvider: OptionsProvider) => {
//     const options = optionsProvider.get();
//     return new DatabaseConnection(options);
//   },
//   inject: [OptionsProvider],
// };

const loggerAliasProvider: Provider = {
  provide: 'AliasedLoggerService',
  useExisting: LoggerService,
};

@Module({
  imports: [CatsModule],
  controllers: [
    AppController,
    AdminController,
    AccountController,
    UsersController,
  ],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: 'CONNECTION',
      useValue: connection,
    },
    configServiceProvider,
    LoggerService,
    loggerAliasProvider,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(logger).forRoutes(CatsController);
  }
}
