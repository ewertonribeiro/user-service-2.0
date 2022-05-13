import { HttpException, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JWT } from 'src/functions/jwt';
import { UserService } from '../user.service';

@Injectable()
export class TokenMiddleware implements NestMiddleware {
  constructor(private userService: UserService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const bearer = req.headers.authorization;

    let autorizationToken: string[];

    if (bearer) autorizationToken = bearer.split(' ');

    if (!bearer || autorizationToken.length === 1) {
      throw new HttpException('Por favor Envie Um Token De Acesso!', 404);
    }
    try {
      const tokenValid = JWT.verifyToken(autorizationToken[1]);
      const { sub } = tokenValid;

      const user = await this.userService.getById(Number(sub));

      if (!user) throw new Error('Token Invalido!');

      if (user.token != autorizationToken[1])
        throw new Error('Este Token Nao E Mais Valido,Faça O login Novamente!');

      next();
    } catch (err) {
      throw new HttpException(err.message, 402);
    }
  }
}
