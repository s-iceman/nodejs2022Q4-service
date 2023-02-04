import { IUser } from './user.interface';
import { IArtist } from './artist.interface';
import { ITrack } from './track.interface';
import { IAlbum } from './album.interface';
import {
  CreateUserDto,
  UpdatePasswordDto,
} from 'src/realization/user/user.dto';
import { CreateArtistDto } from '../../realization/artist/artist.dto';

interface IUserDatabase {
  getUsers(): Promise<IUser[]>;
  getUser(id: string): Promise<IUser>;
  createUser(createUserDto: CreateUserDto): Promise<IUser>;
  deleteUser(id: string): Promise<void>;
  updatePassword(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<IUser>;
}

interface IArtistDatabase {
  getArtists(): Promise<IArtist[]>;
  getArtist(id: string): Promise<IArtist>;
  createArtist(createArtistDto: CreateArtistDto): Promise<IArtist>;
  deleteArtist(id: string): Promise<void>;
}

interface ITrackDatabase {
  getTracks(): Promise<ITrack[]>;
  getTrack(id: string): Promise<ITrack>;
  // createArtist(createArtistDto: CreateArtistDto): Promise<IArtist>;
  deleteTrack(id: string): Promise<void>;
}

interface IAlbumDatabase {
  getAlbums(): Promise<IAlbum[]>;
  getAlbum(id: string): Promise<IAlbum>;
  // createArtist(createArtistDto: CreateArtistDto): Promise<IArtist>;
  deleteAlbum(id: string): Promise<void>;
}

export { IUserDatabase, IArtistDatabase, ITrackDatabase, IAlbumDatabase };
