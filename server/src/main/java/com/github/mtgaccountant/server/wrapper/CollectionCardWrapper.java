package com.github.mtgaccountant.server.wrapper;

import com.github.mtgaccountant.server.models.Prices;

import lombok.Data;

@Data
public class CollectionCardWrapper {
    private String id;
    private String name;
    private boolean collected;
    private String set;
    private Prices prices;

    public CollectionCardWrapper(String id, String name, String set, boolean collected, Prices prices) {
        this.id = id;
        this.name = name;
        this.set = set;
        this.collected = collected;
        this.prices = prices;
    }
}
