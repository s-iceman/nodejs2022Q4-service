import { IAlbum } from './album.interface';
import { IArtist } from './artist.interface';
import { ITrack } from './track.interface';

interface IFavorites {
  artists: string[];
  albums: string[];
  tracks: string[];
}

interface IFavoritesResponse {
  artists: IArtist[];
  albums: IAlbum[];
  tracks: ITrack[];
}

export { IFavorites, IFavoritesResponse };
