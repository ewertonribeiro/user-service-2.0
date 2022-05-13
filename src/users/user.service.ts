import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Password } from 'src/functions/password';
import { Repository } from 'typeorm';
import { IUpdateResponse, IUserResponse } from './responses/responses';
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

      return {
        id,
        email,
        lastname,
        name,
      };
    } catch (error) {
      return undefined;
    }
  }

  async getById(id: number): Promise<IUserResponse> {
    try {
      const user = await this.userRepository.findOneBy({
        id,
      });

      return {
        email: user.email,
        name: user.name,
        lastname: user.lastname,
        id: user.id,
        token: user.token,
      };
    } catch (error) {
      return undefined;
    }
  }

  async createUser(user: Users): Promise<Users> {
    //Encryp Password

    user.password = await Password.encrypt(user.password);

    return await this.userRepository.save(user);
  }

  async updatePassword(
    password: string,
    newpassword: string,
    id: number,
  ): Promise<IUpdateResponse> {
    if (!(await Password.Compare(password, await this.getPassword(id))))
      throw new Error('Senha Invalida');

    await this.userRepository.update(id, {
      password: await Password.encrypt(newpassword),
    });

    return {
      ok: true,
      mensagem: 'Senha alterada com sucesso!',
    } as IUpdateResponse;
  }

  async deleteUser(id: number): Promise<IUpdateResponse> {
    await this.userRepository.delete(id);
    return {
      ok: true,
      mensagem: 'Usuario deletado com sucesso!',
    };
  }

  private async getPassword(id: number): Promise<string> {
    return (await this.userRepository.findOneBy({ id })).password;
  }
}
