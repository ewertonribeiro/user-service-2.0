import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenMiddleware } from 'src/users/middlewares/token.middleware';
import { DataMiddleware } from './middlewares/dados.middleware';
import {
  UserExistsMiddleware,
  UserNotExistMiddleware,
} from './middlewares/User.Middleware';
import { Users } from './user.entity';
import { UserService } from './user.service';
import { UsersController } from './users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  exports: [TypeOrmModule, UserService],
  providers: [UserService],
  controllers: [UsersController],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TokenMiddleware)
      .forRoutes(
        { path: 'users', method: RequestMethod.GET },
        { path: 'users/id/:id', method: RequestMethod.GET },
        { path: 'users/email/:email', method: RequestMethod.GET },
        { path: 'users/password/:id', method: RequestMethod.PUT },
        { path: 'users/delete/:id', method: RequestMethod.DELETE },
      );

    consumer
      .apply(DataMiddleware, UserExistsMiddleware)
      .forRoutes({ path: 'users', method: RequestMethod.POST });

    consumer
      .apply(UserNotExistMiddleware)
      .forRoutes(
        { path: 'users/delete/:id', method: RequestMethod.DELETE },
        { path: 'users/email/:email', method: RequestMethod.GET },
        { path: 'users/id/:id', method: RequestMethod.GET },
        { path: 'users/password/:id', method: RequestMethod.PUT },
      );
  }
}
