interface IAlbum {
  id: string;
  name: string;
  year: number;
  artistId: string | null;
}

type AlbumPartial = Omit<IAlbum, 'id'>;

export { IAlbum, AlbumPartial };
