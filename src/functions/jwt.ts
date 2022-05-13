import { sign, verify } from 'jsonwebtoken';
import { secret } from 'src/configs/jwt.secret';

export const JWT = {
  newToken(id: number, email: string): string {
    const token = sign({ usuario: email }, secret, {
      subject: String(id),
      expiresIn: '1d',
    });

    return token;
  },
  verifyToken(token: string) {
    return verify(token, secret);
  },
};
