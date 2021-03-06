import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Users } from '../user.entity';
import { UserService } from '../user.service';

@Injectable()
export class UserExistsMiddleware implements NestMiddleware {
  constructor(private userService: UserService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const body: Users = req.body;

    if (body.email) {
      if (await this.userService.getByEmail(body.email))
        return res
          .status(400)
          .json({ statuscode: 400, mensagem: 'Usuario ja existe no banco!' });
    }

    next();
  }
}

@Injectable()
export class UserNotExistMiddleware implements NestMiddleware {
  constructor(private userService: UserService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    if (req.params.email) {
      if (!(await this.userService.getByEmail(req.params.email)))
        return res
          .status(404)
          .json({ statuscode: 404, mensagem: 'Usuario nao existe!' });

      return next();
    }

    if (!(await this.userService.getById(Number(req.params.id))))
      return res
        .status(404)
        .json({ statuscode: 404, mensagem: 'Usuario nao existe!' });

    next();
  }
}
