import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { CatsController } from './cats/cats.controller';
import { CatsModule } from './cats/cats.module';
import { CatsService } from './cats/cats.service';
import { GraphQLModule } from '@nestjs/graphql';
import { Module } from '@nestjs/common';
import { RecipesModule } from './recipes/recipes.module';
import { RolesGuard } from './auth/roles.guard';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    RecipesModule,
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',
    }),
    AuthModule,
    UsersModule,
    CatsModule,
  ],
  // providers: [
  //   {
  //     provide: APP_GUARD,
  //     useClass: JwtAuthGuard,
  //   },
  // ],
  controllers: [AppController, CatsController],
  providers: [
    CatsService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
