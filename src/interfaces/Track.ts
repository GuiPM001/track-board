import { Artist } from "./Artist";
import { Image } from "./Image";

export interface Track {
  id: string;
  name: string;
  duration_ms: number;
  artists: Artist[];
  album?: Album;
}

interface Album {
  images: Image[];
}