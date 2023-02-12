package com.github.mtgaccountant.server.models;

import java.io.Serializable;

import lombok.Data;

@Data
public class CollectionCountData implements Serializable{
    private Integer collected;
    private Integer totalCount;
}
