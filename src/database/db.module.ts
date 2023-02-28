import { Global, Module } from '@nestjs/common';
import { DatabaseService } from './db.provider';

@Global()
@Module({
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
