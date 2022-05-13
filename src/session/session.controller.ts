import { Body, Controller, Get, HttpException, Post } from '@nestjs/common';
import { JWT } from 'src/functions/jwt';
import { ILoginRequest } from './requests/loginRequest';
import { ILoginResponse } from './responses/loginResponse';
import { SessionService } from './session.service';

@Controller('session')
export class SessionController {
  constructor(private sessionService: SessionService) {}

  @Post()
  async login(
    @Body() { email, password }: ILoginRequest,
  ): Promise<ILoginResponse> {
    try {
      return await this.sessionService.login(email, password);
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  @Get()
  teste() {
    return JWT.verifyToken(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjoibWlsYW5lQGdtYWlsLmNvbSIsImlhdCI6MTY1MjM3NjQ3NSwiZXhwIjoxNjUyMzc2NTM1LCJzdWIiOiI1In0.QcnCKg9l0a4AkCiDPeiNWe5CaW03JfaZXvGgA8zdTE4',
    );
  }
}
