import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { LoggingService } from 'src/logger/logger.service';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(
    private readonly logger: LoggingService,
    private readonly httpAdapterHost: HttpAdapterHost,
  ) {}

  async catch(exception: unknown, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    let statusCode = undefined;
    let message = undefined;
    let name = undefined;
    if (!(exception instanceof HttpException)) {
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Unknown internal server error';
      name = 'InternalServerError';
    } else {
      statusCode = exception.getStatus();
      message = exception.message;
      name = exception.name;
    }

    await this.logger.error(
      `[${statusCode}] Exception ${name} with message "${message}"`,
    );

    const responseBody = {
      statusCode,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      message,
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, statusCode);
  }
}
