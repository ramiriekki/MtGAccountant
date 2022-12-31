package com.github.mtgaccountant.server.wrapper;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CardWrapper {
    private Integer id;
    private String name;
    private String release_date;
    private String oracle_text;
    private String[] colors;
    private String[] keywords;
    private String set_code;
    private String set_name;
    private String collector_number;
    private String rarity;
    private String artist;
    
    public CardWrapper(Integer id, String name, String release_date, String oracle_text, String[] colors,
            String[] keywords, String set_code, String set_name, String collector_number, String rarity,
            String artist) {
        this.id = id;
        this.name = name;
        this.release_date = release_date;
        this.oracle_text = oracle_text;
        this.colors = colors;
        this.keywords = keywords;
        this.set_code = set_code;
        this.set_name = set_name;
        this.collector_number = collector_number;
        this.rarity = rarity;
        this.artist = artist;
    }

}