package com.github.mtgaccountant.server.models;

import java.io.Serializable;
import java.util.List;

import org.springframework.data.mongodb.core.mapping.Document;

import com.github.mtgaccountant.server.wrapper.CollectionCardWrapper;
import com.github.mtgaccountant.server.wrapper.UserWrapper;

import lombok.Data;

@Data
@Document("collections")
public class Collection implements Serializable{
    private static final long serialVersionUID = 1L;

    private String id;

    private UserWrapper user;

    private List<CollectionCardWrapper> cards;
}
