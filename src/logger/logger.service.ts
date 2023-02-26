import { Injectable, LoggerService } from '@nestjs/common';
import { formatDate } from 'src/common/helper';

@Injectable()
export class LoggingService implements LoggerService {
  log(message: any): void {
    const date = formatDate(new Date());
    console.log(`[${date}] [LOG:] ${message}`);
    // super.log(`[${date}] ${message}`);
  }

  warn(message: any): void {
    const date = formatDate(new Date());
    console.log(`[${date}] [WARNING:] ${message}`);
    // super.warn(`[${date}] ${message}`);
  }

  error(message: any): void {
    const date = formatDate(new Date());
    console.log(`[${date}] [ERROR:] ${message}`);
    // super.warn(`[${date}] ${message}`);
  }
}
