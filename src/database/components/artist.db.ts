import { ArtistPartial, IArtist } from '../interfaces/artist.interface';
import { IArtistDatabase } from '../interfaces/db.interface';
import { getAll, getElem, deleteElem } from './helper';
import { ArtistDto } from '../../realization/artist/artist.dto';
import { generateUuid } from '../../common/helper';
import { NotFound } from 'src/common/exceptions';

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

  async createArtist(createArtistDto: ArtistDto): Promise<IArtist> {
    const id = generateUuid(this.artists);
    this.artists.set(id, createArtistDto);
    return { id, ...createArtistDto };
  }

  async deleteArtist(id: string): Promise<void> {
    await deleteElem<ArtistPartial>(this.artists, id);
  }

  async updateArtist(id: string, updateArtistDto: ArtistDto): Promise<IArtist> {
    const artistData = this.artists.get(id);
    if (!artistData) {
      throw new NotFound();
    }

    this.artists.set(id, updateArtistDto);
    return { id, ...updateArtistDto };
  }
}
