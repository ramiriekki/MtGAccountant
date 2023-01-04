package com.github.mtgaccountant.server.service;

import org.springframework.http.ResponseEntity;

import com.github.mtgaccountant.server.models.Collection;

public interface CollectionService {
    ResponseEntity<Collection> getCollection(String email);
}
