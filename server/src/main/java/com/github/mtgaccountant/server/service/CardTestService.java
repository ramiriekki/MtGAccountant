package com.github.mtgaccountant.server.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.github.mtgaccountant.server.models.Card;

public interface CardTestService {
    ResponseEntity<List<Card>> getAllCards();
    //ResponseEntity<String> createCollection();
}
