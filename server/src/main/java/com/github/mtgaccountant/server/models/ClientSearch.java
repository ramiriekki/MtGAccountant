package com.github.mtgaccountant.server.models;

import java.io.Serializable;

import lombok.Data;

@Data
public class ClientSearch implements Serializable {
    public ClientSearch(String name, String[] rarities, String[] setTypes, Integer minPrice, Integer maxPrice,
            String[] sets, String[] colors, String owned) {
        this.name = name;
        this.rarities = rarities;
        this.setTypes = setTypes;
        this.minPrice = minPrice;
        this.maxPrice = maxPrice;
        this.sets = sets;
        this.colors = colors;
        this.owned = owned;
    }

    private String name;

    private String[] rarities;

    private String[] setTypes;

    private int minPrice;

    private int maxPrice;

    private String[] sets;

    private String[] colors;

    private String owned;
}
