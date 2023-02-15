import { Injectable } from '@nestjs/common';
import { InvalidUuid, NotFound } from '../../common/exceptions';
import { DatabaseService } from '../../database/db.provider';
import { ITrack } from '../../database/interfaces/track.interface';
import { validate } from 'uuid';
import { TrackDto } from './track.dto';

@Injectable()
export class TrackService {
  constructor(private db: DatabaseService) {}

  async getTracks(): Promise<ITrack[]> {
    return await this.db.track.findMany();
  }

  async getTrack(id: string): Promise<ITrack> {
    if (!validate(id)) {
      throw new InvalidUuid();
    }
    try {
      return await this.db.track.findUnique({ where: { id }});
    } catch (err) {
      throw new NotFound();
    }
  }

  async createTrack(createTrackDto: TrackDto): Promise<ITrack> {
    return await this.db.track.create({ data: createTrackDto });
  }

  async deleteTrack(id: string): Promise<void> {
    if (!validate(id)) {
      throw new InvalidUuid();
    }
    try {
      await this.db.track.delete({ where: { id } });
    } catch (err) {
      throw new NotFound();
    }
  }

  async updateTrack(id: string, updateTrackDto: TrackDto): Promise<ITrack> {
    if (!validate(id)) {
      throw new InvalidUuid();
    }
    try {
      return await this.db.track.update({
        where: { id },
        data: { updateTrackDto },
      });
    } catch (err) {
      throw new NotFound();
    }
  }
}
