package com.github.mtgaccountant.server.service;

import java.util.Map;

import org.springframework.http.ResponseEntity;

import com.github.mtgaccountant.server.models.Collection;

public interface CollectionService {
    ResponseEntity<Collection> getCollection(String email);

    ResponseEntity<String> updateCollection(Map<String, String[]> requestMap, String email);
}
