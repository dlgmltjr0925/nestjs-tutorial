import { NextFunction, Request } from 'express';

import { NestMiddleware } from '@nestjs/common';

export class LoggerMiddleWare implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request...');
    next();
  }
}
