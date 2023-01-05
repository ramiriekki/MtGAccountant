package com.github.mtgaccountant.server.models;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
public class Prices implements Serializable{
    @JsonProperty("usd")
    private String usd;

    @JsonProperty("usd_foil")
    private String usd_foil;

    @JsonProperty("eur")
    private String eur;

    @JsonProperty("eur_foil")
    private String eur_foil;

    @JsonProperty("tix")
    private String tix;
}
