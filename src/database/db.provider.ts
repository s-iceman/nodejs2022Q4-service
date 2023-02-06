import { Injectable } from '@nestjs/common';
import {
  IAlbumDatabase,
  IArtistDatabase,
  ITrackDatabase,
  IUserDatabase,
  IFavoritesDatabase,
  IDatabase,
} from './interfaces/db.interface';
import { UserDatabaseComponent } from './components/user.db';
import { ArtistDatabaseComponent } from './components/artist.db';
import { TrackDatabaseComponent } from './components/track.db';
import { AlbumDatabaseComponent } from './components/album.db';
import { FavoritesDatabaseComponent } from './components/favorites.db';
import { IFavoritesResponse } from './interfaces/favorites.interface';

@Injectable()
export class Database implements IDatabase {
  users: IUserDatabase;
  artists: IArtistDatabase;
  tracks: ITrackDatabase;
  albums: IAlbumDatabase;
  favorites: IFavoritesDatabase;

  constructor() {
    this.users = new UserDatabaseComponent();
    this.artists = new ArtistDatabaseComponent();
    this.tracks = new TrackDatabaseComponent();
    this.albums = new AlbumDatabaseComponent();
    this.favorites = new FavoritesDatabaseComponent();
  }

  async deleteArtist(id: string): Promise<void> {
    await this.artists.deleteArtist(id);
    await this.tracks.updateArtistIdInTracks(id, null);
    await this.albums.updateArtistIdInAlbums(id, null);
    await this.favorites.deleteArtist(id);
  }

  async deleteTrack(id: string): Promise<void> {
    await this.tracks.deleteTrack(id);
    await this.favorites.deleteTrack(id);
  }

  async deleteAlbum(id: string): Promise<void> {
    await this.albums.deleteAlbum(id);
    await this.tracks.updateAlbumIdInTracks(id, null);
    await this.favorites.deleteAlbum(id);
  }

  async getFavorites(): Promise<IFavoritesResponse> {
    const idx = await this.favorites.getFavorites();
    const tracks = await Promise.all(
      idx.tracks.map(async (id) => await this.tracks.getTrack(id)),
    );
    const albums = await Promise.all(
      idx.albums.map(async (id) => await this.albums.getAlbum(id)),
    );
    const artists = await Promise.all(
      idx.artists.map(async (id) => await this.artists.getArtist(id)),
    );
    return {
      tracks,
      albums,
      artists,
    };
  }
}
