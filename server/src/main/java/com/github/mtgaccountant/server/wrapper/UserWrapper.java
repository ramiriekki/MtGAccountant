package com.github.mtgaccountant.server.wrapper;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserWrapper {
    private String id;
    private String username;
    private String email;
    private String status;
    private String role;
    
    public UserWrapper(String id, String username, String email, String status, String role) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.status = status;
        this.role = role;
    }

    
}
