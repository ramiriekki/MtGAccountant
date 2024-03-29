import { CardFaces } from './CardFaces';
import { PurchaseUris } from './PurchaseUris';

export interface Card {
    id: string;
    name: string;
    released_at: string;
    image_uris: ImageUris;
    oracle_text: string;
    power: string;
    toughness: string;
    parent_set_code: string;
    icon_svg_uri: string;
    colors: string[];
    color_identity: string[];
    keywords: [];
    card_faces: CardFaces[];
    set: string;
    set_name: string;
    set_type: string;
    collector_number: string;
    rarity: string;
    flavor_text: string;
    artist: string;
    prices: Prices;
    purchase_uris: PurchaseUris;
    collected: boolean;
}

export interface ImageUris {
    small: string;
    normal: string;
    large: string;
    png: string;
    border_crop: string;
}

export interface Prices {
    usd: string;
    usd_foil: string;
    eur: string;
    eur_foil: string;
    tix: string;
}
