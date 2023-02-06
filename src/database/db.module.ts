import { Global, Module } from '@nestjs/common';
import { Database } from './db.provider';

@Global()
@Module({
  providers: [Database],
  exports: [Database],
})
export class DatabaseModule {}
