package com.github.mtgaccountant.server.wrapper;

import lombok.Data;

@Data
public class CollectionCardWrapper {
    private String id;
    private String name;
    private boolean collected;
    private String set;
    
    public CollectionCardWrapper(String id, String name, String set, boolean collected) {
        this.id = id;
        this.name = name;
        this.set = set;
        this.collected = collected;
    }
}
