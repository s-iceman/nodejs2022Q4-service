import { IAlbum } from 'src/database/interfaces/album.interface';

export class Album implements IAlbum {
  id: string;
  name: string;
  year: number;
  artistId: string | null;

  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.year = data.year;
    this.artistId = data.artistId;
  }
}
