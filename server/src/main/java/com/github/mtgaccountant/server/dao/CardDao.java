package com.github.mtgaccountant.server.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.github.mtgaccountant.server.models.Card;
import com.github.mtgaccountant.server.wrapper.CardWrapper;

public interface CardDao extends JpaRepository<Card, Integer>{
    List<CardWrapper> getAllCards();
}
