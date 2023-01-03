package com.github.mtgaccountant.server.models;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Embeddable;
import lombok.Data;

@Data
@Embeddable
public class PurchaseUri implements Serializable{
    @JsonProperty("tcgplayer")
    private String tcgplayer;

    @JsonProperty("cardmarket")
    private String cardmarket;

    @JsonProperty("cardhoarder")
    private String cardhoarder;        
}
