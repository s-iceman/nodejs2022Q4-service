import { Injectable } from '@nestjs/common';
import { InvalidUuid } from '../../common/exceptions';
import { Database } from '../../database/db.provider';
import { IAlbum } from '../../database/interfaces/album.interface';
import { validate } from 'uuid';
// import { CreateArtistDto } from './artist.dto';

@Injectable()
export class AlbumService {
  constructor(private db: Database) {}

  async getAlbums(): Promise<IAlbum[]> {
    return await this.db.getAlbums();
  }

  async getAlbum(id: string): Promise<IAlbum> {
    if (!validate(id)) {
      throw new InvalidUuid();
    }
    return await this.db.getAlbum(id);
  }

  /*
  async createArtist(createArtistDto: CreateArtistDto): Promise<IArtist> {
    return await this.db.createArtist(createArtistDto);
  }
  */

  async deleteAlbum(id: string): Promise<void> {
    if (!validate(id)) {
      throw new InvalidUuid();
    }
    await this.db.deleteAlbum(id);
  }
}
