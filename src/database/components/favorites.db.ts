import { IFavoritesDatabase } from '../interfaces/db.interface';
import { IFavorites } from '../interfaces/favorites.interface';

export class FavoritesDatabaseComponent implements IFavoritesDatabase {
  private tracks: Set<string>;
  private albums: Set<string>;
  private artists: Set<string>;

  constructor() {
    this.tracks = new Set();
    this.albums = new Set();
    this.artists = new Set();
  }

  async getFavorites(): Promise<IFavorites> {
    return new Promise((resolve) =>
      resolve({
        tracks: Array.from(this.tracks),
        albums: Array.from(this.albums),
        artists: Array.from(this.artists),
      }),
    );
  }

  addTrack(id: string): void {
    this.tracks.add(id);
  }

  addAlbum(id: string): void {
    this.albums.add(id);
  }

  addArtist(id: string): void {
    this.artists.add(id);
  }

  deleteTrack(id: string): void {
    this.tracks.delete(id);
  }

  deleteArtist(id: string): void {
    this.artists.delete(id);
  }

  deleteAlbum(id: string): void {
    this.albums.delete(id);
  }
}
