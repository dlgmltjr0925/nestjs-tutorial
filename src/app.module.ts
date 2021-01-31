import { AccountController } from './account/account.controller';
import { AdminController } from './admin/admin.controller';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [
    AppController,
    CatsController,
    AdminController,
    AccountController,
  ],
  providers: [AppService],
})
export class AppModule {}
