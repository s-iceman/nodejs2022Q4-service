import { Injectable } from '@nestjs/common';
import { InvalidUuid } from '../../common/exceptions';
import { Database } from '../../database/db.provider';
import { ITrack } from '../../database/interfaces/track.interface';
import { validate } from 'uuid';
import { TrackDto } from './track.dto';

@Injectable()
export class TrackService {
  constructor(private db: Database) {}

  async getTracks(): Promise<ITrack[]> {
    return await this.db.tracks.getTracks();
  }

  async getTrack(id: string): Promise<ITrack> {
    if (!validate(id)) {
      throw new InvalidUuid();
    }
    return await this.db.tracks.getTrack(id);
  }

  async createTrack(createTrackDto: TrackDto): Promise<ITrack> {
    return await this.db.tracks.createTrack(createTrackDto);
  }

  async deleteTrack(id: string): Promise<void> {
    if (!validate(id)) {
      throw new InvalidUuid();
    }
    await this.db.deleteTrack(id);
  }

  async updateTrack(id: string, updateTrackDto: TrackDto): Promise<ITrack> {
    if (!validate(id)) {
      throw new InvalidUuid();
    }
    return await this.db.tracks.updateTrack(id, updateTrackDto);
  }
}
