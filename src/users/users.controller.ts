import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { IPasswords } from './requests/passwords.request';
import { IUpdateResponse, IUserResponse } from './responses/responses';
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
      throw new HttpException(error.message, 400);
    }
  }

  @Get('id/:id')
  async getUserByid(@Param('id') id: number): Promise<IUserResponse> {
    try {
      const user = await this.userService.getById(id);
      return {
        id: user.id,
        email: user.email,
        name: user.name,
        lastname: user.lastname,
      };
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  @Get('email/:email')
  async getUserByEmail(@Param('email') email: string): Promise<IUserResponse> {
    try {
      return await this.userService.getByEmail(email);
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  @Post()
  async createUser(@Body() user: Users): Promise<Users> {
    try {
      return await this.userService.createUser(user);
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  @Put('password/:id')
  async updatePassword(
    @Body() { password, newpassword }: IPasswords,
    @Param('id') id: number,
  ): Promise<IUpdateResponse> {
    try {
      return await this.userService.updatePassword(password, newpassword, id);
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  @Delete('delete/:id')
  async deleteUser(@Param('id') id: number): Promise<IUpdateResponse> {
    try {
      return await this.userService.deleteUser(id);
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }
}
