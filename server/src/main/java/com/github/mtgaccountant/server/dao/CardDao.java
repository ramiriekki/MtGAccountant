package com.github.mtgaccountant.server.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.github.mtgaccountant.server.models.Card;

public interface CardDao extends JpaRepository<Card, Integer>{
    
}
