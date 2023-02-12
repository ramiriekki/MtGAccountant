package com.github.mtgaccountant.server.wrapper;

import org.springframework.data.mongodb.core.mapping.Document;

import com.github.mtgaccountant.server.models.DoubleFaceCard;
import com.github.mtgaccountant.server.models.ImageUri;
import com.github.mtgaccountant.server.models.Prices;
import com.github.mtgaccountant.server.models.PurchaseUri;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Document("cards")
public class CardWrapper {
    private String id;
    private String name;
    private String released_at;
    private ImageUri image_uris;
    private String oracle_text;
    private String power;
    private String toughness;
    private String[] colors;
    private String[] color_identity;    
    private String[] keywords;
    private DoubleFaceCard[] card_faces;
    private String set;
    private String set_name;
    private String set_type;
    private String collector_number;
    private String rarity;
    private String flavor_text;
    private String artist;
    private Prices prices;
    private PurchaseUri purchase_uris;
    private boolean collected;

    public CardWrapper(String id, String name, String released_at, ImageUri image_uris, String oracle_text,
            String power, String toughness, String[] colors, String[] color_identity, String[] keywords, DoubleFaceCard[] card_faces,
            String set, String set_name, String set_type, String collector_number, String rarity,
            String flavor_text, String artist, Prices prices, PurchaseUri purchase_uris, boolean collected) {
        this.id = id;
        this.name = name;
        this.released_at = released_at;
        this.image_uris = image_uris;
        this.oracle_text = oracle_text;
        this.power = power;
        this.toughness = toughness;
        this.colors = colors;
        this.color_identity = color_identity;
        this.keywords = keywords;
        this.card_faces = card_faces;
        this.set = set;
        this.set_name = set_name;
        this.set_type = set_type;
        this.collector_number = collector_number;
        this.rarity = rarity;
        this.flavor_text = flavor_text;
        this.artist = artist;
        this.prices = prices;
        this.purchase_uris = purchase_uris;
        this.collected = collected;
    }
}