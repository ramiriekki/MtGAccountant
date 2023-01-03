package com.github.mtgaccountant.server.dao;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.github.mtgaccountant.server.models.Collection;

public interface CollectionDao extends MongoRepository<Collection, Integer>{

}
