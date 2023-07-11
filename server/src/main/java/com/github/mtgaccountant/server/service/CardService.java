package com.github.mtgaccountant.server.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.github.mtgaccountant.server.wrapper.CardWrapper;

public interface CardService {
    ResponseEntity<List<CardWrapper>> getAllCards();

    ResponseEntity<CardWrapper> getCard(String cardId);

    ResponseEntity<List<CardWrapper>> getSetCards(String code);
}
