import { Injectable } from '@nestjs/common';
import { InvalidUuid } from '../../common/exceptions';
import { Database } from '../../database/db.provider';
import { ITrack } from '../../database/interfaces/track.interface';
import { validate } from 'uuid';
// import { CreateArtistDto } from './artist.dto';

@Injectable()
export class TrackService {
  constructor(private db: Database) {}

  async getTracks(): Promise<ITrack[]> {
    return await this.db.getTracks();
  }

  async getTrack(id: string): Promise<ITrack> {
    if (!validate(id)) {
      throw new InvalidUuid();
    }
    return await this.db.getTrack(id);
  }

  /*
  async createArtist(createArtistDto: CreateArtistDto): Promise<IArtist> {
    return await this.db.createArtist(createArtistDto);
  }
  */

  async deleteTrack(id: string): Promise<void> {
    if (!validate(id)) {
      throw new InvalidUuid();
    }
    await this.db.deleteTrack(id);
  }
}
