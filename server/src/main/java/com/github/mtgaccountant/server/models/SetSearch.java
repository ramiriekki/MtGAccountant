package com.github.mtgaccountant.server.models;

import java.io.Serializable;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
public class SetSearch implements Serializable{
    @JsonProperty("has_more")
    private boolean has_more;

    @JsonProperty("data")
    private List<Set> data;
}
