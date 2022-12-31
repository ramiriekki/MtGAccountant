package com.github.mtgaccountant.server.models;

import java.io.Serializable;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.NamedQuery;
import jakarta.persistence.Table;
import lombok.Data;

@NamedQuery(name = "Card.getAllCards", query = "SELECT c FROM Card c")

@Data
@Entity
@DynamicUpdate
@DynamicInsert
@Table(name = "all_cards")
public class Card implements Serializable{
    private static final long serialVersionUID = 1L;
    
    @Id
    @Column(name = "id")
    private String id;
    
    @JsonProperty("name")
    @Column(name = "name")
    private String name;

    @Column(name = "released_at")
    private String released_at;

    @Column(name = "image_uris")
    @Embedded
    private ImageUri image_uris;

    @Column(name = "oracle_text", length = 1337)
    private String oracle_text;

    @Column(name = "power")
    private String power;

    @Column(name = "toughness")
    private String toughness;

    @Column(name = "colors")
    private String[] colors;

    @Column(name = "color_identity")
    private String[] color_identity;    

    @Column(name = "keywords")
    private String[] keywords;

    @Column(name = "set_name")
    private String set_name;

    @Column(name = "set_type")
    private String set_type;

    @Column(name = "collector_number")
    private String collector_number;

    @Column(name = "rarity")
    private String rarity;

    @Column(name = "flavor_text")
    private String flavor_text;

    @Column(name = "artist")
    private String artist;

    @Column(name = "prices")
    @Embedded
    private Prices prices;

    @Column(name = "purchase_uris")
    @Embedded
    private PurchaseUri purchase_uris;
}
