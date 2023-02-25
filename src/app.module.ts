import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TrackModule } from './realization/track/track.module';
import { UserModule } from './realization/user/user.module';
import { AlbumModule } from './realization/album/album.module';
import { ArtistModule } from './realization/artist/artist.module';
import { FavoritesModule } from './realization/favorites/favorites.module';
import { LoggingService } from './common/logger/logger.service';

@Module({
  imports: [
    UserModule,
    ArtistModule,
    TrackModule,
    AlbumModule,
    FavoritesModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggingService).forRoutes('*');
  }
}
