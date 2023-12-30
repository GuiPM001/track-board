import { Artist } from "./Artist";
import { ExternalUrl } from "./ExternalUrl";
import { Image } from "./Image";

export interface Track {
  id: string;
  name: string;
  duration_ms: number;
  artists: Artist[];
  album: Album;
  external_urls: ExternalUrl;
}

interface Album {
  images: Image[];
}