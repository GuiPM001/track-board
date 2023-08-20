import { Image } from "./Image";

export interface UserProfile {
  display_name: string;
  email: string;
  followers: { total: number; };
  id: string;
  images: Image[];
  product: string;
}