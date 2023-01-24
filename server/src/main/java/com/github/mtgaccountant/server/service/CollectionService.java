package com.github.mtgaccountant.server.service;

import java.util.Map;

import org.springframework.http.ResponseEntity;

import com.github.mtgaccountant.server.models.Collection;
import com.github.mtgaccountant.server.models.CollectionCountData;

public interface CollectionService {
    ResponseEntity<Collection> getCollection(String email);

    ResponseEntity<String> updateCollection(Map<String, String[]> requestMap, String email);

    ResponseEntity<CollectionCountData> getCollectionSetCount(String email, String code);
}
