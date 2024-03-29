package com.github.mtgaccountant.server.service;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;

import com.github.mtgaccountant.server.models.Collection;
import com.github.mtgaccountant.server.models.CollectionCountData;
import com.github.mtgaccountant.server.models.SetsProgress;
import com.github.mtgaccountant.server.wrapper.CardWrapper;

public interface CollectionService {
    ResponseEntity<Collection> getCollection(String email);

    ResponseEntity<String> updateCollection(Map<String, String[]> requestMap, String email);

    ResponseEntity<CollectionCountData> getCollectionSetCount(String email, String code);

    ResponseEntity<List<SetsProgress>> getCollectionSetsProgress(String email);

    ResponseEntity<Double> getCollectionValue(String email);

    ResponseEntity<CardWrapper> getMostValuableCard(String email);

    ResponseEntity<Integer> countCollected(String email);
}
