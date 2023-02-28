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

    public Prices(String usd, String usd_foil, String eur, String eur_foil, String tix) {
        this.usd = usd;
        this.usd_foil = usd_foil;
        this.eur = eur;
        this.eur_foil = eur_foil;
        this.tix = tix;
    }
}
