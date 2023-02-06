interface IArtist {
  id: string;
  name: string;
  grammy: boolean;
}

type ArtistPartial = Omit<IArtist, 'id'>;

export { IArtist, ArtistPartial };
