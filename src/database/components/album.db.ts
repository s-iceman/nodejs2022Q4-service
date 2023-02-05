import { AlbumPartial, IAlbum } from '../interfaces/album.interface';
import { IAlbumDatabase } from '../interfaces/db.interface';
import { getAll, getElem, deleteElem } from './helper';
import { AlbumDto } from 'src/realization/album/album.dto';
import { generateUuid } from 'src/common/helper';
import { NotFound } from 'src/common/exceptions';

export class AlbumDatabaseComponent implements IAlbumDatabase {
  private albums: Map<string, AlbumPartial>;

  constructor() {
    this.albums = new Map();
  }

  async getAlbums(): Promise<IAlbum[]> {
    return await getAll<IAlbum>(this.albums);
  }

  async getAlbum(id: string): Promise<IAlbum> {
    return await getElem<IAlbum>(this.albums, id);
  }

  async createAlbum(createAlbumDto: AlbumDto): Promise<IAlbum> {
    const id = generateUuid(this.albums);
    const albumData = { artistId: null, ...createAlbumDto };
    this.albums.set(id, albumData);
    return { id, ...albumData };
  }

  async updateAlbum(id: string, updateAlbumDto: AlbumDto): Promise<IAlbum> {
    const albumData = this.albums.get(id);
    if (!albumData) {
      throw new NotFound();
    }
    const updated = { ...albumData, ...updateAlbumDto };
    this.albums.set(id, updated);
    return { id, ...updated };
  }

  async deleteAlbum(id: string): Promise<void> {
    await deleteElem<AlbumPartial>(this.albums, id);
  }

  async updateArtistIdInAlbums(
    artistId: string,
    newValue: string,
  ): Promise<void> {
    [...this.albums]
      .filter((elem) => elem[1].artistId === artistId)
      .forEach((album) => {
        this.albums.set(album[0], { ...album[1], artistId: newValue });
      });
  }
}
