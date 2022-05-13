import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JWT } from 'src/functions/jwt';
import { Password } from 'src/functions/password';
import { Users } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { ILoginResponse } from './responses/loginResponse';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(Users) private userRepository: Repository<Users>,
  ) {}

  async login(email: string, pass: string): Promise<ILoginResponse> {
    const user = await this.userRepository.findOneBy({ email });

    if (!user) throw new Error('Usuario Nao Encontrado!');

    if (!(await Password.Compare(pass, user.password)))
      throw new Error('Email Ou Senha invalida');

    const token = JWT.newToken(user.id, email);

    await this.userRepository.update(user.id, {
      token,
    });

    return { mensagem: 'Usuario logado com secesso!', token, usuario: email };
  }
}
