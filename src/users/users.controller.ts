import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Users } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UsersController {
    constructor(private userService : UserService){}

    @Get()
    async getUsers():Promise<Users[]> {

        return await this.userService.getAll();
    }

    @Get('id/:id')
    async getUserByid(@Param('id') id : number):Promise<Users> {

        return await this.userService.getById(id);
    }

    @Get('email/:email')
    async getUserByEmail(@Param('email') email : string ):Promise<Users> {

        return await this.userService.getByEmail(email);
    }

    @Post()
    async createUser(@Body() user:Users ) : Promise<Users> {

        return await this.userService.createUser(user);
    }

    @Put('password')
    async updatePassword(@Body() {password,id} :Users):Promise<[number,Users[]]> {

        return await this.userService.updatePassword(password,id);
    }
   
    @Delete('delete/:id')
    async deleteUser(@Param('id') id : number):Promise<Users> {

        return await this.userService.deleteUser(id);
    }

}
