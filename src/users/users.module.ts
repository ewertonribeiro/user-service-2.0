import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './user.entity';
import { UserService } from './user.service';
import { UsersController } from './users.controller';

@Module({
    imports:[TypeOrmModule.forFeature([Users])],
    exports:[TypeOrmModule],
    providers:[UserService],
    controllers: [UsersController]
})
export class UsersModule {}
