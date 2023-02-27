import { config } from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/exception.filter';
import { LoggingService } from './logger/logger.service';

async function bootstrap() {
  config();
  const port = process.env.PORT ? +process.env.PORT : 4000;
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.enableShutdownHooks();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: false },
    }),
  );

  const logger = <LoggingService>app.get(LoggingService);
  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(logger, httpAdapterHost));
  logger.debug(`Application is started on port ${port}`);

  process.on('unhandledRejection', async (err) => {
    await logger.error(`Unhandled Rejection ${err}`);
  });

  process.on('uncaughtException', async (exc) => {
    await logger.error(`Uncaught Rejection ${exc.name} ${exc.message}`);
    process.exit(1);
  });

  await app.listen(port);
}
bootstrap();
