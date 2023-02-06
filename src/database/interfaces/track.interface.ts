interface ITrack {
  id: string;
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;
}

type TrackPartial = Omit<ITrack, 'id'>;

export { ITrack, TrackPartial };
