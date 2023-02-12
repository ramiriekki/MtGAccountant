package com.github.mtgaccountant.server.models;

import java.io.Serializable;

import lombok.Data;

@Data
public class ClientSearch implements Serializable{
    private String name;
    
    private String[] rarities;

    private String[] setTypes;

    private int minPrice;

    private int maxPrice;

    private String[] sets;

    private String owned;
}
