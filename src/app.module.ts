import { Module } from '@nestjs/common';
import { TypeOrmConfig } from './configs/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';

@Module({
  imports: [TypeOrmModule.forRoot(TypeOrmConfig), UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
