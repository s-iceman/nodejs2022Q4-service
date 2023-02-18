import { Injectable } from '@nestjs/common';
import { validate } from 'uuid';
import { InvalidEntity, InvalidUuid, NotFound } from 'src/common/exceptions';
import { IFavoritesResponse } from 'src/database/interfaces/favorites.interface';
import { DatabaseService } from '../../database/db.provider';
import { Artist } from '../artist/artist.entity';
import { Album } from '../album/album.entity';
import { Track } from '../track/track.entity';

@Injectable()
export class FavoritesService {
  constructor(private db: DatabaseService) {}

  async getFavorites(): Promise<IFavoritesResponse> {
    return await this.db.$transaction(async (tx) => {
      const artists = await tx.artist.findMany(this.getPredToFindObjects());
      const albums = await tx.album.findMany(this.getPredToFindObjects());
      const tracks = await tx.track.findMany(this.getPredToFindObjects());
      return {
        artists: artists.map((e) => ({ ...new Artist(e) })),
        albums: albums.map((e) => ({ ...new Album(e) })),
        tracks: tracks.map((e) => ({ ...new Track(e) })),
      };
    });
  }

  async addTrack(id: string): Promise<void> {
    this.validate(id);
    await this.db.$transaction(async (tx) => {
      try {
        await tx.track.findUniqueOrThrow({ where: { id } });
      } catch (err) {
        throw new InvalidEntity();
      }

      await tx.track.update({
        where: { id },
        data: { favsId: (await tx.favs.create({ data: {} })).id },
      });
    });
  }

  async addAlbum(id: string): Promise<void> {
    this.validate(id);
    await this.db.$transaction(async (tx) => {
      try {
        await tx.album.findUniqueOrThrow({ where: { id } });
      } catch (err) {
        throw new InvalidEntity();
      }

      await tx.album.update({
        where: { id },
        data: { favsId: (await tx.favs.create({ data: {} })).id },
      });
    });
  }

  async addArtist(id: string): Promise<void> {
    this.validate(id);
    await this.db.$transaction(async (tx) => {
      try {
        await tx.artist.findUniqueOrThrow({ where: { id } });
      } catch (err) {
        throw new InvalidEntity();
      }

      await tx.artist.update({
        where: { id },
        data: { favsId: (await tx.favs.create({ data: {} })).id },
      });
    });
  }

  async deleteTrack(id: string): Promise<void> {
    this.validate(id);
    await this.db.$transaction(async (tx) => {
      try {
        const track = await tx.track.findUnique({ where: { id } });
        await tx.favs.delete({ where: { id: track.favsId } });
        await tx.track.update({
          where: { id },
          data: { favsId: null },
        });
      } catch (err) {
        throw new NotFound();
      }
    });
  }

  async deleteAlbum(id: string): Promise<void> {
    this.validate(id);
    await this.db.$transaction(async (tx) => {
      try {
        const album = await tx.album.findUniqueOrThrow({ where: { id } });
        await tx.favs.delete({ where: { id: album.favsId } });
        await tx.album.update({
          where: { id },
          data: { favsId: null },
        });
      } catch (err) {
        throw new NotFound();
      }
    });
  }

  async deleteArtist(id: string): Promise<void> {
    this.validate(id);
    await this.db.$transaction(async (tx) => {
      try {
        const artist = await tx.artist.findUnique({ where: { id } });
        await tx.favs.delete({ where: { id: artist.favsId } });
        await tx.artist.update({
          where: { id },
          data: { favsId: null },
        });
      } catch (err) {
        throw new NotFound();
      }
    });
  }

  private validate(id: string): void {
    if (!validate(id)) {
      throw new InvalidUuid();
    }
  }

  private getPredToFindObjects() {
    return {
      where: { NOT: [{ favsId: null }] },
    };
  }
}
