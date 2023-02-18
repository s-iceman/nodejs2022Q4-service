import { IArtist } from 'src/database/interfaces/artist.interface';

export class Artist implements IArtist {
  id: string;
  name: string;
  grammy: boolean;

  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.grammy = data.grammy;
  }
}
