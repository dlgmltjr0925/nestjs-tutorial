import { AccountController } from './account/account.controller';
import { AdminController } from './admin/admin.controller';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { HttpService } from './http/http.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [CatsModule],
  controllers: [AppController, AdminController, AccountController],
  providers: [AppService, HttpService],
})
export class AppModule {}
