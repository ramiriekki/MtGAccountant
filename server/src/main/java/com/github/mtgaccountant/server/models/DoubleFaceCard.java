package com.github.mtgaccountant.server.models;

import java.io.Serializable;

import lombok.Data;

@Data
public class DoubleFaceCard implements Serializable{
    private String name;
    private String type_line;
    private String oracle_text;
    private String[] colors;
    private String power;
    private String toughness;
    private String flavor_text;
    private String artist;
    private ImageUri image_uris;
}
