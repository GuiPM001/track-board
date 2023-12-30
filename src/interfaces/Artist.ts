import { ExternalUrl } from "./ExternalUrl";
import { Image } from "./Image";

export interface Artist {
  id: string;
  name: string;
  images: Image[];
  external_urls: ExternalUrl;
}