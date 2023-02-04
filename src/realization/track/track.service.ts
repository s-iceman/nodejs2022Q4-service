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
    return await this.db.getTracks();
  }

  async getTrack(id: string): Promise<ITrack> {
    if (!validate(id)) {
      throw new InvalidUuid();
    }
    return await this.db.getTrack(id);
  }

  async createTrack(createTrackDto: TrackDto): Promise<ITrack> {
    return await this.db.createTrack(createTrackDto);
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
    return await this.db.updateTrack(id, updateTrackDto);
  }
}
