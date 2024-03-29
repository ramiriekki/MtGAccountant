package com.github.mtgaccountant.server.models;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
public class ImageUri implements Serializable{
    @JsonProperty("small")
    private String small;

    @JsonProperty("normal")
    private String normal;

    @JsonProperty("large")
    private String large;

    @JsonProperty("png")
    private String png;

    @JsonProperty("border_crop")
    private String border_crop;
}
