import { Injectable } from '@nestjs/common';
import { InvalidUuid, NotFound } from '../../common/exceptions';
import { DatabaseService } from '../../database/db.provider';
import { ITrack } from '../../database/interfaces/track.interface';
import { TrackDto } from './track.dto';
import { Track } from './track.entity';
import { validate } from 'uuid';

@Injectable()
export class TrackService {
  constructor(private db: DatabaseService) {}

  async getTracks(): Promise<ITrack[]> {
    return (await this.db.track.findMany()).map((e) => ({ ...new Track(e) }));
  }

  async getTrack(id: string): Promise<ITrack> {
    if (!validate(id)) {
      throw new InvalidUuid();
    }
    try {
      return new Track(
        await this.db.track.findUniqueOrThrow({ where: { id } }),
      );
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
        data: { name: updateTrackDto.name },
      });
    } catch (err) {
      throw new NotFound();
    }
  }
}
