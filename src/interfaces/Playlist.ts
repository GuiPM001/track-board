import { Image } from "./Image";

export interface Playlist {
  id: string;
  name: string;
  images: Image[];
  tracks: PlaylistTrack;
  
}

interface PlaylistTrack {
  href: string;
  total: number;
}