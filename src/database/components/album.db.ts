import { AlbumPartial, IAlbum } from '../interfaces/album.interface';
import { IAlbumDatabase } from '../interfaces/db.interface';
import { getAll, getElem, deleteElem } from './helper';
// import { generateUuid } from '../../common/helper';

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

  /*
  async createArtist(createArtistDto: CreateArtistDto): Promise<IArtist> {
    const id = generateUuid(this.artists);
    this.artists.set(id, createArtistDto);
    return { id, ...createArtistDto };
  }
  */

  async deleteAlbum(id: string): Promise<void> {
    await deleteElem<AlbumPartial>(this.albums, id);
  }
}
