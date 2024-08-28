import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class AuthMiddlware implements NestMiddleware {
  constructor(private readonly jwt: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.headers.authorization) {
        console.log(req.headers.authorization);
        return res.status(403).json({ message: 'Token is required' });
      }
      const payloadToken = this.jwt.verify(req.headers.authorization);
      if (!payloadToken) {
        console.log(payloadToken);
        return res.status(403).json({ message: 'Token is invalid' });
      }
      next();
    } catch (error) {
      console.log(error.message);
      return res.status(403).json({ message: 'Token is invalid' });
    }
  }
}
