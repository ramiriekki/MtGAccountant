package com.github.mtgaccountant.server.models;

import java.io.Serializable;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Embeddable;
import lombok.Data;

@Data
@Embeddable
public class Search implements Serializable{
    @JsonProperty("data")
    private List<Card> data;
}
