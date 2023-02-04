interface IAlbum {
  id: string; // uuid v4
  name: string;
  year: number;
  artistId: string | null; // refers to Artist
}

type AlbumPartial = Omit<IAlbum, 'id'>;

export { IAlbum, AlbumPartial };
