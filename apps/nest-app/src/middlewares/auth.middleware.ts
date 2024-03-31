import { UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
export function bearerAuth(req: Request, res: Response, next: NextFunction) {
  const validToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9';
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    throw new UnauthorizedException('Please provide authorization token');
  }
  const token = authHeader.split(' ', -1)[1];
  if (token === validToken) {
    next();
  } else {
    throw new UnauthorizedException();
  }
}
