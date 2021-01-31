import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { Module } from '@nestjs/common';
import { AdminController } from './admin/admin.controller';
import { AccountController } from './account/account.controller';

@Module({
  imports: [],
  controllers: [AppController, CatsController, AdminController, AccountController],
  providers: [AppService],
})
export class AppModule {}
