import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { LoggingService } from '../logger/logger.service';

@Injectable()
export class HttpMiddleware implements NestMiddleware {
  constructor(private readonly logger: LoggingService) {}

  async use(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    const { method, params, protocol, originalUrl, body } = request;
    const url = `${protocol}://${request.get('Host')}${originalUrl}`;
    await this.logger.log(
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

    response.on('close', async () => {
      const { statusCode } = response;
      await this.logger.log(
        `[RESPONSE] [${method}] with body ${resBody} result ${statusCode}`,
      );
    });
    next();
  }
}
