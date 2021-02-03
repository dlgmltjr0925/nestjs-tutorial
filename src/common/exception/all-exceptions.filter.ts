import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpServer,
  HttpStatus,
} from '@nestjs/common';

import { BaseExceptionFilter } from '@nestjs/core';

// export class AllExceptionsFilter implements ExceptionFilter {
//   catch(exception: any, host: ArgumentsHost) {
//     const ctx = host.switchToHttp();
//     const response = ctx.getRequest();
//     const request = ctx.getRequest();

//     const status =
//       exception instanceof HttpException
//         ? exception.getStatus()
//         : HttpStatus.INTERNAL_SERVER_ERROR;

//     response.status(status).json({
//       statusCode: status,
//       timestamp: new Date().toISOString(),
//       path: request.url,
//     });
//   }
// }

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    super.catch(exception, host);
  }
}
