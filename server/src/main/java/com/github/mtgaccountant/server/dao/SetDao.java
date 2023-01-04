package com.github.mtgaccountant.server.dao;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.github.mtgaccountant.server.models.Set;

public interface SetDao extends MongoRepository<Set, Integer>{
    
}
