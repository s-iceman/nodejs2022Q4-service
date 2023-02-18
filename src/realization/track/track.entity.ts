import { ITrack } from 'src/database/interfaces/track.interface';

export class Track implements ITrack {
  id: string;
  name: string;
  duration: number;
  artistId: string | null;
  albumId: string | null;

  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.duration = data.duration;
    this.albumId = data.albumId;
    this.artistId = data.artistId;
  }
}
