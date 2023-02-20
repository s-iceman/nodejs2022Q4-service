import { Module } from '@nestjs/common';
import { TrackModule } from './realization/track/track.module';
import { UserModule } from './realization/user/user.module';
import { AlbumModule } from './realization/album/album.module';
import { ArtistModule } from './realization/artist/artist.module';
import { FavoritesModule } from './realization/favorites/favorites.module';

@Module({
  imports: [
    UserModule,
    ArtistModule,
    TrackModule,
    AlbumModule,
    FavoritesModule,
  ],
})
export class AppModule {}
