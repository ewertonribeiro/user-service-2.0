import { Module } from '@nestjs/common';
import { TypeOrmConfig } from './configs/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { Users } from './users/user.entity';

@Module({
  imports: [TypeOrmModule.forRoot(TypeOrmConfig), UsersModule],
  controllers: [],
  providers: [Users],
})
export class AppModule {}
