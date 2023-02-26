import { Injectable } from '@nestjs/common';
import { InvalidUuid, AlbumNotFound } from '../../common/exceptions';
import { DatabaseService } from '../../database/db.provider';
import { IAlbum } from '../../database/interfaces/album.interface';
import { AlbumDto } from './album.dto';
import { Album } from '../album/album.entity';
import { validate } from 'uuid';

@Injectable()
export class AlbumService {
  constructor(private db: DatabaseService) {}

  async getAlbums(): Promise<IAlbum[]> {
    return (await this.db.album.findMany()).map((e) => ({ ...new Album(e) }));
  }

  async getAlbum(id: string): Promise<IAlbum> {
    if (!validate(id)) {
      throw new InvalidUuid();
    }
    try {
      return new Album(
        await this.db.album.findUniqueOrThrow({ where: { id } }),
      );
    } catch (err) {
      throw new AlbumNotFound();
    }
  }

  async createAlbum(createAlbumDto: AlbumDto): Promise<IAlbum> {
    return new Album(await this.db.album.create({ data: createAlbumDto }));
  }

  async deleteAlbum(id: string): Promise<void> {
    if (!validate(id)) {
      throw new InvalidUuid();
    }
    try {
      await this.db.album.delete({ where: { id } });
    } catch (err) {
      throw new AlbumNotFound();
    }
  }

  async updateAlbum(id: string, updateAlbumDto: AlbumDto): Promise<IAlbum> {
    if (!validate(id)) {
      throw new InvalidUuid();
    }
    try {
      return new Album(
        await this.db.album.update({
          where: { id },
          data: updateAlbumDto,
        }),
      );
    } catch (err) {
      throw new AlbumNotFound();
    }
  }
}
