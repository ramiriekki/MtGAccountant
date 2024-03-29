package com.github.mtgaccountant.server.dao;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.github.mtgaccountant.server.models.Conversation;

public interface ChatDao extends MongoRepository<Conversation, String>{
    
}
