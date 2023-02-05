import { Injectable } from '@nestjs/common';
import {
  IAlbumDatabase,
  IArtistDatabase,
  ITrackDatabase,
  IUserDatabase,
  IDatabase,
} from './interfaces/db.interface';
import { UserDatabaseComponent } from './components/user.db';
import { ArtistDatabaseComponent } from './components/artist.db';
import { TrackDatabaseComponent } from './components/track.db';
import { AlbumDatabaseComponent } from './components/album.db';

@Injectable()
export class Database implements IDatabase {
  users: IUserDatabase;
  artists: IArtistDatabase;
  tracks: ITrackDatabase;
  albums: IAlbumDatabase;

  constructor() {
    this.users = new UserDatabaseComponent();
    this.artists = new ArtistDatabaseComponent();
    this.tracks = new TrackDatabaseComponent();
    this.albums = new AlbumDatabaseComponent();
  }

  async deleteUser(id: string): Promise<void> {
    await this.users.deleteUser(id);
  }

  async deleteArtist(id: string): Promise<void> {
    await this.artists.deleteArtist(id);
  }

  async deleteTrack(id: string): Promise<void> {
    await this.tracks.deleteTrack(id);
  }

  async deleteAlbum(id: string): Promise<void> {
    await this.albums.deleteAlbum(id);
    await this.tracks.updateAlbumIdInTracks(id, null);
  }
}
