package com.github.mtgaccountant.server.dao;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.github.mtgaccountant.server.models.Collection;
import com.github.mtgaccountant.server.wrapper.CollectionCardWrapper;
import com.github.mtgaccountant.server.wrapper.UserWrapper;

public interface CollectionDao extends MongoRepository<Collection, Integer> {
    @Query(value = "{user : '?0'}")
    Collection findByUser(UserWrapper user);

    Collection findByFinderID(String finderID);

    @Query(value = "{email:'?0'}", fields = "{'cards' : 1}")
    List<CollectionCardWrapper> findCardsList(String email);
}
