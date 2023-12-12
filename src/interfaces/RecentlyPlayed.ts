import { Track } from "./Track";

export interface RecentlyPlayed {
  cursors: Cursors;
  next: string;
  items: TrackHistory[];
}

export interface TrackHistory {
  track: Track;
  played_at: Date;
}

interface Cursors {
  before: string;
  after: string;
}