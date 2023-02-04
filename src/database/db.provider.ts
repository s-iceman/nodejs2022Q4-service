import { Injectable } from '@nestjs/common';
import {
  IAlbumDatabase,
  IArtistDatabase,
  ITrackDatabase,
  IUserDatabase,
} from './interfaces/db.interface';
import { IUser } from './interfaces/user.interface';
import { ITrack } from './interfaces/track.interface';
import { CreateUserDto, UpdatePasswordDto } from '../realization/user/user.dto';
import { CreateArtistDto } from '../realization/artist/artist.dto';
import { TrackDto } from '../realization/track/track.dto';
import { UserDatabaseComponent } from './components/user.db';
import { ArtistDatabaseComponent } from './components/artist.db';
import { IArtist } from './interfaces/artist.interface';
import { TrackDatabaseComponent } from './components/track.db';
import { AlbumDatabaseComponent } from './components/album.db';
import { IAlbum } from './interfaces/album.interface';

@Injectable()
export class Database
  implements IUserDatabase, IArtistDatabase, ITrackDatabase, IAlbumDatabase
{
  private users: IUserDatabase;
  private artists: IArtistDatabase;
  private tracks: ITrackDatabase;
  private albums: IAlbumDatabase;

  constructor() {
    this.users = new UserDatabaseComponent();
    this.artists = new ArtistDatabaseComponent();
    this.tracks = new TrackDatabaseComponent();
    this.albums = new AlbumDatabaseComponent();
  }

  async getUsers(): Promise<IUser[]> {
    return await this.users.getUsers();
  }

  async getUser(id: string): Promise<IUser | null> {
    return await this.users.getUser(id);
  }

  async createUser(createUserDto: CreateUserDto): Promise<IUser> {
    return await this.users.createUser(createUserDto);
  }

  async deleteUser(id: string): Promise<void> {
    await this.users.deleteUser(id);
  }

  async updatePassword(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<IUser> {
    return await this.users.updatePassword(id, updatePasswordDto);
  }

  async getArtists(): Promise<IArtist[]> {
    return await this.artists.getArtists();
  }

  async getArtist(id: string): Promise<IArtist> {
    return await this.artists.getArtist(id);
  }

  async createArtist(createArtistDto: CreateArtistDto): Promise<IArtist> {
    return this.artists.createArtist(createArtistDto);
  }

  async deleteArtist(id: string): Promise<void> {
    await this.artists.deleteArtist(id);
  }

  async getTracks(): Promise<ITrack[]> {
    return await this.tracks.getTracks();
  }

  async getTrack(id: string): Promise<ITrack> {
    return await this.tracks.getTrack(id);
  }

  async createTrack(createTrackDto: TrackDto): Promise<ITrack> {
    return await this.tracks.createTrack(createTrackDto);
  }

  async updateTrack(id: string, updateTrackDto: TrackDto): Promise<ITrack> {
    return await this.tracks.updateTrack(id, updateTrackDto);
  }

  async deleteTrack(id: string): Promise<void> {
    await this.tracks.deleteTrack(id);
  }

  async getAlbums(): Promise<IAlbum[]> {
    return await this.albums.getAlbums();
  }

  async getAlbum(id: string): Promise<IAlbum> {
    return await this.albums.getAlbum(id);
  }

  async deleteAlbum(id: string): Promise<void> {
    await this.albums.deleteAlbum(id);
  }
}
