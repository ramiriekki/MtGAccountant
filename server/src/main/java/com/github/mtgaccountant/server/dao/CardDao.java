package com.github.mtgaccountant.server.dao;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.github.mtgaccountant.server.wrapper.CardSearchWrapper;
import com.github.mtgaccountant.server.wrapper.CardWrapper;
import com.github.mtgaccountant.server.wrapper.CollectionCardWrapper;

public interface CardDao extends MongoRepository<CardWrapper, Integer>{
    @Query(value="{}", fields="{'id' : 1, 'name' : 1, 'set' : 1, 'collected' : 1}")
    List<CollectionCardWrapper> findAllCollectionCards();

    @Query(value="{}")
    List<CardWrapper> findAlCardWrappers();

    @Query(value="{}")
    List<CardSearchWrapper> findAllCardSearchWrappers();

    @Query("{_id:'?0'}")
    CardWrapper findCardById(String id);

    @Query("{set:'?0'}")
    List<CardWrapper> findSetCards(String code);
}
