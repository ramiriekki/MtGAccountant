package com.github.mtgaccountant.server.wrapper;

import com.github.mtgaccountant.server.models.Prices;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CardSearchWrapper {
    private String name;
    //private String released_at;
    private String set;
    private String set_name;
    private String set_type;
    private String collector_number;
    private String rarity;
    private Prices prices;
    
    public CardSearchWrapper(String name, /*String released_at,*/ String set, String set_name, String set_type,
            String collector_number, String rarity, Prices prices) {
        this.name = name;
        //this.released_at = released_at;
        this.set = set;
        this.set_name = set_name;
        this.set_type = set_type;
        this.collector_number = collector_number;
        this.rarity = rarity;
        this.prices = prices;
    }
}
