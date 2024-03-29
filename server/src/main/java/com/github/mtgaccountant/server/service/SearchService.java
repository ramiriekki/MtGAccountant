package com.github.mtgaccountant.server.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.github.mtgaccountant.server.models.ClientSearch;
import com.github.mtgaccountant.server.wrapper.CardSearchWrapper;

public interface SearchService {
    ResponseEntity<List<CardSearchWrapper>> searchCards(String name, String[] rarities, String[] setTypes,
            Integer minPrice,
            Integer maxPrice, String[] sets, String[] colors, String owned);
}
