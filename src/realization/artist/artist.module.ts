import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/db.module';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ArtistController],
  providers: [ArtistService],
})
export class ArtistModule {}
