import { Injectable } from '@nestjs/common';
import { InvalidUuid } from 'src/common/exceptions';
import { DatabaseService } from 'src/database/db.provider';
import { IArtist } from 'src/database/interfaces/artist.interface';
import { validate } from 'uuid';
import { ArtistDto } from './artist.dto';

@Injectable()
export class ArtistService {
  constructor(private db: DatabaseService) {}

  async getArtists(): Promise<IArtist[]> {
    return await this.db.artists.getArtists();
  }

  async getArtist(id: string): Promise<IArtist> {
    if (!validate(id)) {
      throw new InvalidUuid();
    }
    return await this.db.artists.getArtist(id);
  }

  async createArtist(createArtistDto: ArtistDto): Promise<IArtist> {
    return await this.db.artists.createArtist(createArtistDto);
  }

  async deleteArtist(id: string): Promise<void> {
    if (!validate(id)) {
      throw new InvalidUuid();
    }
    await this.db.deleteArtist(id);
  }

  async updateArtist(id: string, updateArtistDto: ArtistDto): Promise<IArtist> {
    if (!validate(id)) {
      throw new InvalidUuid();
    }
    return await this.db.artists.updateArtist(id, updateArtistDto);
  }
}
