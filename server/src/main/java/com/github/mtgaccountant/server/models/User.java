package com.github.mtgaccountant.server.models;

import java.io.Serializable;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document("users")
public class User implements Serializable{
    private static final long serialVersionUID = 1L;

    private String _id;

    private String username;

    private String email;

    private String password;

    private String status;

    private String role;
}
