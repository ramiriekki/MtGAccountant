package com.github.mtgaccountant.server.wrapper;

import com.github.mtgaccountant.server.models.DoubleFaceCard;
import com.github.mtgaccountant.server.models.ImageUri;
import com.github.mtgaccountant.server.models.Prices;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CardSearchWrapper {
    private String name;
    private String set;
    private String set_name;
    private String set_type;
    private String collector_number;
    private String rarity;
    private Prices prices;
    private ImageUri image_uris;
    private DoubleFaceCard[] card_faces;
    
    public CardSearchWrapper(String name, /*String released_at,*/ String set, String set_name, String set_type,
            String collector_number, String rarity, Prices prices, ImageUri image_uri, DoubleFaceCard[] card_faces) {
        this.name = name;
        this.set = set;
        this.set_name = set_name;
        this.set_type = set_type;
        this.collector_number = collector_number;
        this.rarity = rarity;
        this.prices = prices;
        this.image_uris = image_uri;
        this.card_faces = card_faces;
    }
}
