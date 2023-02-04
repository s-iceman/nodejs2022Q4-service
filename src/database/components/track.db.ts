import { TrackPartial, ITrack } from '../interfaces/track.interface';
import { ITrackDatabase } from '../interfaces/db.interface';
import { getAll, getElem, deleteElem } from './helper';
// import { generateUuid } from '../../common/uuid-helper';

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

  /*
  async createArtist(createArtistDto: CreateArtistDto): Promise<IArtist> {
    const id = generateUuid(this.artists);
    this.artists.set(id, createArtistDto);
    return { id, ...createArtistDto };
  }
  */

  async deleteTrack(id: string): Promise<void> {
    await deleteElem<TrackPartial>(this.tracks, id);
  }
}
