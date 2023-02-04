import { TrackPartial, ITrack } from '../interfaces/track.interface';
import { ITrackDatabase } from '../interfaces/db.interface';
import { getAll, getElem, deleteElem } from './helper';
import { TrackDto } from 'src/realization/track/track.dto';
import { generateUuid } from '../../common/uuid-helper';
import { NotFound } from 'src/common/exceptions';

export class TrackDatabaseComponent implements ITrackDatabase {
  private tracks: Map<string, TrackPartial>;

  constructor() {
    this.tracks = new Map();
  }

  async getTracks(): Promise<ITrack[]> {
    return await getAll<ITrack>(this.tracks);
  }

  async getTrack(id: string): Promise<ITrack> {
    return await getElem<ITrack>(this.tracks, id);
  }

  async createTrack(createTrackDto: TrackDto): Promise<ITrack> {
    const id = generateUuid(this.tracks);
    const data = { artistId: null, albumId: null, ...createTrackDto };
    this.tracks.set(id, data);
    return { id, artistId: null, albumId: null, ...createTrackDto };
  }

  async deleteTrack(id: string): Promise<void> {
    await deleteElem<TrackPartial>(this.tracks, id);
  }

  async updateTrack(id: string, updateTrackDto: TrackDto): Promise<ITrack> {
    const track = this.tracks.get(id);
    if (!track) {
      throw new NotFound();
    }
    return { id, ...{ ...track, ...updateTrackDto } };
  }
}
