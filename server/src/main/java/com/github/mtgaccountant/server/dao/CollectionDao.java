package com.github.mtgaccountant.server.dao;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.github.mtgaccountant.server.models.Collection;
import com.github.mtgaccountant.server.wrapper.UserWrapper;

public interface CollectionDao extends MongoRepository<Collection, Integer>{
    Collection findByUser(UserWrapper user);
}
