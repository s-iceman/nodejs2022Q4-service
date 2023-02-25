import { Injectable, Logger } from '@nestjs/common';
import { formatDate } from 'src/common/helper';

@Injectable()
export class LoggingService extends Logger {
  log(message: any): void {
    const date = formatDate(new Date());
    super.log(`[${date}] ${message}`);
  }
}
