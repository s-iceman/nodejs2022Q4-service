import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/db.module';
import { ArtistModule } from '../artist/artist.module';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';

@Module({
  imports: [DatabaseModule, ArtistModule],
  controllers: [FavoritesController],
  providers: [FavoritesService],
})
export class FavoritesModule {}
