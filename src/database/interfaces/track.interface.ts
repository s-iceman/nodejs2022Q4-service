interface ITrack {
  id: string;
  name: string;
  artistId: string | null; // refers to Artist
  albumId: string | null; // refers to Album
  duration: number; // integer number
}

type TrackPartial = Omit<ITrack, 'id'>;

export { ITrack, TrackPartial };
