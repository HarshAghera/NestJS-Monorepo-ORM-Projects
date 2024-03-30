import { Request, Response, NextFunction } from 'express';
export function bearerAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader.split(' ', -1)[1];
  console.log(process.env)
  next();
}
