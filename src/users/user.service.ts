import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Password } from 'src/functions/password';
import { Repository } from 'typeorm';
import { IUpdatePassword, IUserResponse } from './responses/responses';
import { Users } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}

  async getAll(): Promise<Users[]> {
    return await this.userRepository.find();
  }

  async getByEmail(Email: string): Promise<IUserResponse> {
    try {
      const { email, name, lastname, id } = await this.userRepository.findOneBy(
        {
          email: Email,
        },
      );
      const userFound = {
        email,
        id,
        lastname,
        name,
      } as IUserResponse;
      return userFound;
    } catch (error) {
      return undefined;
    }
  }

  async getById(Id: number): Promise<IUserResponse> {
    try {
      const userFound = await this.userRepository.findOneBy({
        id: Id,
      });

      const user: IUserResponse = {
        email: userFound.email,
        name: userFound.name,
        lastname: userFound.lastname,
        id: userFound.id,
      };
      return user;
    } catch (error) {
      return undefined;
    }
  }

  async createUser(user: Users): Promise<Users> {
    //Encryp Password
    user.password = await Password.encrypt(user.password);

    return await this.userRepository.save(user);
  }

  async updatePassword(password: string, id: number): Promise<IUpdatePassword> {
    await this.userRepository.query(
      `UPDATE users SET password='${password}' WHERE id=${id};`,
    );

    return {
      ok: true,
      mensagem: 'Senha alterada com sucesso!',
    } as IUpdatePassword;
  }

  async deleteUser(id: number): Promise<Users> {
    return await this.userRepository.query(`DELETE FROM users WHERE id=${id}`);
  }

  async getPassword(id: number): Promise<string> {
    return (await this.userRepository.findOneBy({ id })).password;
  }
}
