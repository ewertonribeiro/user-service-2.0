import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Password } from 'src/functions/password';
import { IPasswords } from './requests/passwords.request';
import { IUpdatePassword, IUserResponse } from './responses/responses';
import { Users } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UserService) {}

  @Get()
  async getUsers(): Promise<Users[]> {
    try {
      return await this.userService.getAll();
    } catch (error) {
      return error;
    }
  }

  @Get('id/:id')
  async getUserByid(@Param('id') id: number): Promise<IUserResponse> {
    try {
      return await this.userService.getById(id);
    } catch (error) {
      return error;
    }
  }

  @Get('email/:email')
  async getUserByEmail(@Param('email') email: string): Promise<IUserResponse> {
    try {
      return await this.userService.getByEmail(email);
    } catch (error) {
      return error;
    }
  }

  @Post()
  async createUser(@Body() user: Users): Promise<Users> {
    try {
      return await this.userService.createUser(user);
    } catch (error) {
      return error;
    }
  }

  @Put('password/:id')
  async updatePassword(
    @Body() { password, newpassword }: IPasswords,
    @Param('id') id: number,
  ): Promise<IUpdatePassword> {
    const dbPass = await this.userService.getPassword(id);

    const comparePassword = await Password.Compare(password, dbPass);

    try {
      if (!comparePassword) return { ok: false, mensagem: 'Senha Invalida' };

      return await this.userService.updatePassword(
        await Password.encrypt(newpassword),
        id,
      );
    } catch (error) {
      return error;
    }
  }

  @Delete('delete/:id')
  async deleteUser(@Param('id') id: number): Promise<Users> {
    try {
      return await this.userService.deleteUser(id);
    } catch (error) {
      return error;
    }
  }
}
