package com.github.mtgaccountant.server.models;

import java.io.Serializable;
import java.util.List;

import org.springframework.data.mongodb.core.mapping.Document;

import com.github.mtgaccountant.server.wrapper.UserWrapper;

import jakarta.persistence.Id;

import lombok.Data;

// TODO wrapper for cards
@Data
@Document("collections")
public class Collection implements Serializable{
    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    private UserWrapper user;

    private List<Card> cards;
}
