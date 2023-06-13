import { Image } from "./Image";
import { Track } from "./Track";

export interface Playlist {
  id: string;
  name: string;
  images: Image[];
  public: boolean;
  tracks: PlaylistTrack;
  owner: { display_name: string };
}

interface PlaylistTrack {
  href: string;
  total: number;
  items: Item[];
}

interface Item {
  track: Track;
}