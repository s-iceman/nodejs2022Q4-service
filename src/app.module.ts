import { Module } from '@nestjs/common';
import { UserModule } from './realization/user/user.module';

@Module({
  imports: [UserModule],
})
export class AppModule {}
