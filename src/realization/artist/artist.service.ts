import { Injectable } from '@nestjs/common';
import { InvalidUuid, ArtistNotFound } from 'src/common/exceptions';
import { DatabaseService } from 'src/database/db.provider';
import { IArtist } from 'src/database/interfaces/artist.interface';
import { ArtistDto } from './artist.dto';
import { Artist } from './artist.entity';
import { validate } from 'uuid';

@Injectable()
export class ArtistService {
  constructor(private db: DatabaseService) {}

  async getArtists(): Promise<IArtist[]> {
    return (await this.db.artist.findMany()).map((e) => ({ ...new Artist(e) }));
  }

  async getArtist(id: string): Promise<IArtist> {
    if (!validate(id)) {
      throw new InvalidUuid();
    }
    try {
      return new Artist(
        await this.db.artist.findUniqueOrThrow({ where: { id } }),
      );
    } catch (err) {
      throw new ArtistNotFound();
    }
  }

  async createArtist(createArtistDto: ArtistDto): Promise<IArtist> {
    return new Artist(await this.db.artist.create({ data: createArtistDto }));
  }

  async deleteArtist(id: string): Promise<void> {
    if (!validate(id)) {
      throw new InvalidUuid();
    }
    try {
      await this.db.artist.delete({ where: { id } });
    } catch (err) {
      throw new ArtistNotFound();
    }
  }

  async updateArtist(id: string, updateArtistDto: ArtistDto): Promise<IArtist> {
    if (!validate(id)) {
      throw new InvalidUuid();
    }

    try {
      return new Artist(
        await this.db.artist.update({
          where: { id },
          data: updateArtistDto,
        }),
      );
    } catch (err) {
      throw new ArtistNotFound();
    }
  }
}
