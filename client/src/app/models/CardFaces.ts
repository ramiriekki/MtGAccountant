import { ImageUris } from "./Card";

export interface CardFaces{
  name: string;
  type_line: string;
  oracle_text: string;
  colors: string[];
  power: string;
  toughness: string;
  flavor_text: string;
  artist: string;
  image_uris: ImageUris;
}
