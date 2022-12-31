package com.github.mtgaccountant.server.models;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Embeddable;
import lombok.Data;

@Data
@Embeddable
public class PurchaseUri {
    @JsonProperty("tcgplayer")
    private String tcgplayer;

    @JsonProperty("cardmarket")
    private String cardmarket;

    @JsonProperty("cardhoarder")
    private String cardhoarder;        
}
