import { Module } from '@nestjs/common';
import { ArtistModule } from './realization/artist/artist.module';
import { TrackModule } from './realization/track/track.module';
import { UserModule } from './realization/user/user.module';

@Module({
  imports: [UserModule, ArtistModule, TrackModule],
})
export class AppModule {}
