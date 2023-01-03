package com.github.mtgaccountant.server.dao;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.github.mtgaccountant.server.models.Card;

public interface CardDao extends MongoRepository<Card, Integer>{

}
