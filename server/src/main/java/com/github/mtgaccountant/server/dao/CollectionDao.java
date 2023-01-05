package com.github.mtgaccountant.server.dao;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.github.mtgaccountant.server.models.Collection;
import com.github.mtgaccountant.server.wrapper.CollectionCardWrapper;
import com.github.mtgaccountant.server.wrapper.UserWrapper;

public interface CollectionDao extends MongoRepository<Collection, Integer>{
    Collection findByUser(UserWrapper user);

    // List<Question> findByTagsIn(List<String> tags);
    @Query(value="{email:'?0'}", fields="{'cards' : 1}")
    List<CollectionCardWrapper> findCardsList(String email);

    // @Query(value = "{cards._id: '?0'}", fields = "{'cards.card_id.$': 1}")
    // Object findCardByCardId(String id);
}
