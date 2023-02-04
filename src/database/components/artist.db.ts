import { ArtistPartial, IArtist } from '../interfaces/artist.interface';
import { IArtistDatabase } from '../interfaces/db.interface';
import { getAll, getElem, deleteElem } from './helper';
import { CreateArtistDto } from '../../realization/artist/artist.dto';
import { generateUuid } from '../../common/uuid-helper';

export class ArtistDatabaseComponent implements IArtistDatabase {
  private artists: Map<string, ArtistPartial>;

  constructor() {
    this.artists = new Map();
  }

  async getArtists(): Promise<IArtist[]> {
    return await getAll<IArtist>(this.artists);
  }

  async getArtist(id: string): Promise<IArtist> {
    return await getElem<IArtist>(this.artists, id);
  }

  async createArtist(createArtistDto: CreateArtistDto): Promise<IArtist> {
    const id = generateUuid(this.artists);
    this.artists.set(id, createArtistDto);
    return { id, ...createArtistDto };
  }

  async deleteArtist(id: string): Promise<void> {
    await deleteElem<ArtistPartial>(this.artists, id);
  }
}
