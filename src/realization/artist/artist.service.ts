import { Injectable } from '@nestjs/common';
import { InvalidUuid } from 'src/common/exceptions';
import { Database } from 'src/database/db.provider';
import { IArtist } from 'src/database/interfaces/artist.interface';
import { validate } from 'uuid';
import { CreateArtistDto } from './artist.dto';

@Injectable()
export class ArtistService {
  constructor(private db: Database) {}

  async getArtists(): Promise<IArtist[]> {
    return await this.db.getArtists();
  }

  async getArtist(id: string): Promise<IArtist> {
    if (!validate(id)) {
      throw new InvalidUuid();
    }
    return await this.db.getArtist(id);
  }

  async createArtist(createArtistDto: CreateArtistDto): Promise<IArtist> {
    return await this.db.createArtist(createArtistDto);
  }
}
