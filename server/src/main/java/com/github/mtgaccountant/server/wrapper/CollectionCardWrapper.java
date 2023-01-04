package com.github.mtgaccountant.server.wrapper;

import lombok.Data;

@Data
public class CollectionCardWrapper {
    private String id;
    private String name;
    private boolean collected;
    
    public CollectionCardWrapper(String id, String name, boolean collected) {
        this.id = id;
        this.name = name;
        this.collected = false;
    }
}
