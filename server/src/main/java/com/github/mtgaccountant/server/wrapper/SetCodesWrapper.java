package com.github.mtgaccountant.server.wrapper;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class SetCodesWrapper {
    // private String id;
    private String code;
    private String name;
    
    public SetCodesWrapper(String code, String name) {
        // this.id = id;
        this.code = code;
        this.name = name;
    }
}