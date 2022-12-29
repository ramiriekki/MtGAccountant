package com.github.mtgaccountant.server.models;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
public class Search {
    @JsonProperty("data")
    private List<Card> data;
}
