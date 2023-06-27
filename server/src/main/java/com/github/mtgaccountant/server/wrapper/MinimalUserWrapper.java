package com.github.mtgaccountant.server.wrapper;

import lombok.Data;

@Data
public class MinimalUserWrapper {
    private String username;
    private String email;
    
    public MinimalUserWrapper(String username, String email) {
        this.username = username;
        this.email = email;
    }
}
