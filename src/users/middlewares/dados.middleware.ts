import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Users } from '../user.entity';

@Injectable()
export class DataMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { email, name, lastname, password } = req.body as Users;

    if (!email || !name || !lastname || !password)
      return res.status(400).json({
        statuscode: 400,
        mensagem: 'Os dados enviados estao incompletos!',
      });

    if (password.length < 5)
      return res.status(400).json({
        statuscode: 400,
        mensagem: 'A senha precisa ser maior que 5 characteres!',
      });

    if (name.length < 3)
      return res.status(400).json({
        statuscode: 400,
        mensagem: 'O nome precisa ter no minimo 3 characteres!',
      });

    next();
  }
}
