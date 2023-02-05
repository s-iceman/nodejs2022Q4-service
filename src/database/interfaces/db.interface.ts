import { IUser } from './user.interface';
import { IArtist } from './artist.interface';
import { ITrack } from './track.interface';
import { IAlbum } from './album.interface';
import {
  CreateUserDto,
  UpdatePasswordDto,
} from 'src/realization/user/user.dto';
import { ArtistDto } from '../../realization/artist/artist.dto';
import { TrackDto } from 'src/realization/track/track.dto';
import { AlbumDto } from 'src/realization/album/album.dto';

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
  createArtist(createArtistDto: ArtistDto): Promise<IArtist>;
  deleteArtist(id: string): Promise<void>;
  updateArtist(id: string, updateArtistDto: ArtistDto): Promise<IArtist>;
}

interface ITrackDatabase {
  getTracks(): Promise<ITrack[]>;
  getTrack(id: string): Promise<ITrack>;
  createTrack(createTrackDto: TrackDto): Promise<ITrack>;
  deleteTrack(id: string): Promise<void>;
  updateTrack(id: string, updateTrackDto: TrackDto): Promise<ITrack>;
  updateAlbumIdInTracks(
    albumId: string,
    newValue: string | null,
  ): Promise<void>;
  updateArtistIdInTracks(
    artistId: string,
    newValue: string | null,
  ): Promise<void>;
}

interface IAlbumDatabase {
  getAlbums(): Promise<IAlbum[]>;
  getAlbum(id: string): Promise<IAlbum>;
  createAlbum(createAlbumDto: AlbumDto): Promise<IAlbum>;
  deleteAlbum(id: string): Promise<void>;
  updateAlbum(id: string, updateAlbumDto: AlbumDto): Promise<IAlbum>;
  updateArtistIdInAlbums(
    artistId: string,
    newValue: string | null,
  ): Promise<void>;
}

interface IDatabase {
  users: IUserDatabase;
  artists: IArtistDatabase;
  tracks: ITrackDatabase;
  albums: IAlbumDatabase;

  deleteUser(id: string): Promise<void>;
  deleteArtist(id: string): Promise<void>;
  deleteTrack(id: string): Promise<void>;
  deleteAlbum(id: string): Promise<void>;
}

export {
  IUserDatabase,
  IArtistDatabase,
  ITrackDatabase,
  IAlbumDatabase,
  IDatabase,
};
