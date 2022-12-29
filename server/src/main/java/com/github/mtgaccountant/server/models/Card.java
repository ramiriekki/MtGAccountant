package com.github.mtgaccountant.server.models;

import java.io.Serializable;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

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

    // @Id
    // @GeneratedValue(strategy = GenerationType.IDENTITY)
    // @Column(name = "id")
    // private Integer id;

    
    @JsonProperty("name")
    @Column(name = "name")
    private String name;

    @Column(name = "release_date")
    private String release_date;

    //@Column(name = "image")
    //private String image;

    @Column(name = "oracle_text")
    private String oracle_text;

    @Column(name = "colors")
    private String[] colors;

    @Column(name = "keywords")
    private String[] keywords;

    @Column(name = "set_code")
    private String set_code;

    @Column(name = "set_name")
    private String set_name;

    @Column(name = "collector_number")
    private String collector_number;

    @Column(name = "rarity")
    private String rarity;

    @Column(name = "artist")
    private String artist;

    //@Column(name = "prices")
    //private Object prices;
}
