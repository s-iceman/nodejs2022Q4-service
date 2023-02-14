import { Injectable } from '@nestjs/common';
import { InvalidUuid } from '../../common/exceptions';
import { DatabaseService } from '../../database/db.provider';
import { IAlbum } from '../../database/interfaces/album.interface';
import { validate } from 'uuid';
import { AlbumDto } from './album.dto';

@Injectable()
export class AlbumService {
  constructor(private db: DatabaseService) {}

  async getAlbums(): Promise<IAlbum[]> {
    return await this.db.albums.getAlbums();
  }

  async getAlbum(id: string): Promise<IAlbum> {
    if (!validate(id)) {
      throw new InvalidUuid();
    }
    return await this.db.albums.getAlbum(id);
  }

  async createAlbum(createAlbumDto: AlbumDto): Promise<IAlbum> {
    return await this.db.albums.createAlbum(createAlbumDto);
  }

  async deleteAlbum(id: string): Promise<void> {
    if (!validate(id)) {
      throw new InvalidUuid();
    }
    await this.db.deleteAlbum(id);
  }

  async updateAlbum(id: string, updateAlbumDto: AlbumDto): Promise<IAlbum> {
    if (!validate(id)) {
      throw new InvalidUuid();
    }
    return await this.db.albums.updateAlbum(id, updateAlbumDto);
  }
}
