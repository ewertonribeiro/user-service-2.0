import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/users/user.entity';
import { SessionController } from './session.controller';
import { SessionService } from './session.service';
@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  controllers: [SessionController],
  providers: [SessionService],
  exports: [TypeOrmModule],
})
export class SessionModule {}
