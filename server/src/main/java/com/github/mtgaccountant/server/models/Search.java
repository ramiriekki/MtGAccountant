package com.github.mtgaccountant.server.models;

import java.io.Serializable;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.github.mtgaccountant.server.wrapper.CardWrapper;

import jakarta.persistence.Embeddable;
import lombok.Data;

@Data
@Embeddable
public class Search implements Serializable{
    @JsonProperty("has_more")
    private boolean has_more;

    @JsonProperty("next_page")
    private String next_page;

    @JsonProperty("data")
    private List<CardWrapper> data;
}
