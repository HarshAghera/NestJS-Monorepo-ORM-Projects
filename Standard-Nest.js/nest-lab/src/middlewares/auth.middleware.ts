import { UnauthorizedException } from '@nestjs/common';
import { NextFunction, Request } from 'express';
import { verify } from 'jsonwebtoken';

export async function bearerAuth(req: Request, next: NextFunction) {
  if (!req.headers['authorization']) {
    req.user = null;
    throw new UnauthorizedException();
  }

  const token = req.headers['authorization'].split(' ')[1];

  try {
    const decode = verify(token, 'JWT_SECRET') as { email: string };
    const user = await this.userService.findByEmail(decode.email);
    req.user = user;
    next();
  } catch (err) {
    req.user = null;
    throw new UnauthorizedException();
  }
}
