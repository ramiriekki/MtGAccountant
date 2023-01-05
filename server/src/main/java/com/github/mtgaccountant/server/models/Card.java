package com.github.mtgaccountant.server.models;

import java.io.Serializable;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document("cards")
public class Card implements Serializable{
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

    private String set_name;

    private String set_type;

    private String collector_number;

    private String rarity;

    private String flavor_text;

    private String artist;

    private Prices prices;

    private PurchaseUri purchase_uris;

    private boolean collected;
}
