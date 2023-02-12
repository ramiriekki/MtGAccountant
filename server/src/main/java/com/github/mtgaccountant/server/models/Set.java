package com.github.mtgaccountant.server.models;

import java.io.Serializable;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document("sets")
public class Set implements Serializable{
    private String id;

    private String code;

    private String name;

    private String scryfall_uri;

    private String released_at;

    private String set_type;

    private Integer card_count;

    private String parent_set_code;

    private String icon_svg_uri;
}
