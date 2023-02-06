import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/db.module';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';

@Module({
  imports: [DatabaseModule],
  controllers: [AlbumController],
  providers: [AlbumService],
})
export class AlbumModule {}
