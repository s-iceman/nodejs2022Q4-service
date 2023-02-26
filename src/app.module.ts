import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TrackModule } from './realization/track/track.module';
import { UserModule } from './realization/user/user.module';
import { AlbumModule } from './realization/album/album.module';
import { ArtistModule } from './realization/artist/artist.module';
import { FavoritesModule } from './realization/favorites/favorites.module';
import { HttpMiddleware } from './middlewares/http.middleware';
import { LoggerModule } from './logger/logger.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './common/exception.filter';

@Module({
  imports: [
    UserModule,
    ArtistModule,
    TrackModule,
    AlbumModule,
    FavoritesModule,
    LoggerModule,
  ],
  providers: [{ provide: APP_FILTER, useClass: HttpExceptionFilter }],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(HttpMiddleware).forRoutes('*');
  }
}
