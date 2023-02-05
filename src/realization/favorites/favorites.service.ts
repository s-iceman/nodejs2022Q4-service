import { HttpException, Injectable } from '@nestjs/common';
import { validate } from 'uuid';
import { InvalidEntity, InvalidUuid, NotFound } from 'src/common/exceptions';
import { IFavoritesResponse } from 'src/database/interfaces/favorites.interface';
import { Database } from '../../database/db.provider';

@Injectable()
export class FavoritesService {
  constructor(private db: Database) {}

  async getFavorites(): Promise<IFavoritesResponse> {
    return await this.db.getFavorites();
  }

  async addTrack(id: string): Promise<void> {
    this.validate(id);
    try {
      await this.db.tracks.getTrack(id);
    } catch (err) {
      this.processException(err);
    }
    this.db.favorites.addTrack(id);
  }

  async addAlbum(id: string): Promise<void> {
    this.validate(id);
    try {
      await this.db.albums.getAlbum(id);
    } catch (err) {
      this.processException(err);
    }
    this.db.favorites.addAlbum(id);
  }

  async addArtist(id: string): Promise<void> {
    this.validate(id);
    try {
      await this.db.artists.getArtist(id);
    } catch (err) {
      this.processException(err);
    }
    this.db.favorites.addArtist(id);
  }

  async deleteTrack(id: string): Promise<void> {
    this.validate(id);
    if (!(await this.db.tracks.getTrack(id))) {
      throw new NotFound();
    }
    this.db.favorites.deleteTrack(id);
  }

  async deleteAlbum(id: string): Promise<void> {
    this.validate(id);
    if (!(await this.db.albums.getAlbum(id))) {
      throw new NotFound();
    }
    this.db.favorites.deleteAlbum(id);
  }

  async deleteArtist(id: string): Promise<void> {
    this.validate(id);
    if (!(await this.db.artists.getArtist(id))) {
      throw new NotFound();
    }
    this.db.favorites.deleteArtist(id);
  }

  private validate(id: string): void {
    if (!validate(id)) {
      throw new InvalidUuid();
    }
  }

  private processException(err: HttpException): void {
    if (err instanceof NotFound) {
      throw new InvalidEntity();
    }
  }
}
