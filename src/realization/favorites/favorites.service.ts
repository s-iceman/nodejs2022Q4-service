import { Injectable } from '@nestjs/common';
import { validate } from 'uuid';
import { InvalidEntity, InvalidUuid } from 'src/common/exceptions';
import { IFavoritesResponse } from 'src/database/interfaces/favorites.interface';
import { Database } from '../../database/db.provider';

@Injectable()
export class FavoritesService {
  constructor(private db: Database) {}

  async getFavorites(): Promise<IFavoritesResponse> {
    return await this.db.getFavorites();
  }

  async addTrack(id: string): Promise<void> {
    await this.validate(id);
    if (!(await this.db.tracks.getTrack(id))) {
      throw new InvalidEntity();
    }
    this.db.favorites.addTrack(id);
  }

  async addAlbum(id: string): Promise<void> {
    await this.validate(id);
    if (!(await this.db.albums.getAlbum(id))) {
      throw new InvalidEntity();
    }
    this.db.favorites.addAlbum(id);
  }

  async addArtist(id: string): Promise<void> {
    await this.validate(id);
    if (!(await this.db.artists.getArtist(id))) {
      throw new InvalidEntity();
    }
    this.db.favorites.addArtist(id);
  }

  private async validate(id: string): Promise<void> {
    if (!validate(id)) {
      throw new InvalidUuid();
    }
  }
}
