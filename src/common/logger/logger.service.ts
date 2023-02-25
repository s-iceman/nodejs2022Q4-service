import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { formatDate } from '../helper';

@Injectable()
export class LoggingService implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const { method, params, protocol, originalUrl, body } = request;
    const url = `${protocol}://${request.get('Host')}${originalUrl}`;
    this.logger.log(
      `[${formatDate(
        new Date(),
      )}] [REQUEST:] [${url}] ${method} with params "${JSON.stringify(
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
        `[${formatDate(
          new Date(),
        )}] [RESPONSE:] [${method}] with body ${resBody} result ${statusCode}`,
      );
    });
    next();
  }
}
