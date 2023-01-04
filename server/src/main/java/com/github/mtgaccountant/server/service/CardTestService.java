package com.github.mtgaccountant.server.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.github.mtgaccountant.server.wrapper.CardWrapper;

public interface CardTestService {
    ResponseEntity<List<CardWrapper>> getAllCards();
    //ResponseEntity<String> createCollection();
}
