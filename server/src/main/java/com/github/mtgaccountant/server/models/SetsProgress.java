package com.github.mtgaccountant.server.models;

import java.io.Serializable;

import lombok.Data;

@Data
public class SetsProgress implements Serializable{
    private String code;
    private Integer totalCount;
    private Integer progress;
    
    public SetsProgress(String code, Integer totalCount, Integer progress) {
        this.code = code;
        this.totalCount = totalCount;
        this.progress = progress;
    }
}
