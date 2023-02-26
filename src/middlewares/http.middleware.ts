import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { LoggingService } from '../logger/logger.service';

@Injectable()
export class HttpMiddleware implements NestMiddleware {
  constructor(private readonly logger: LoggingService) {}

  use(request: Request, response: Response, next: NextFunction): void {
    const { method, params, protocol, originalUrl, body } = request;
    const url = `${protocol}://${request.get('Host')}${originalUrl}`;
    this.logger.log(
      `[REQUEST] [${url}] ${method} with params "${JSON.stringify(
        Object.values(params),
      )}" and body ${JSON.stringify(body)}`,
    );

    const send = response.send;
    let resBody = undefined;
    response.send = (content: any) => {
      resBody = content;
      response.send = send;
      return response.send(content);
    };

    response.on('close', () => {
      const { statusCode } = response;
      this.logger.log(
        `[RESPONSE] [${method}] with body ${resBody} result ${statusCode}`,
      );
    });
    next();
  }
}
