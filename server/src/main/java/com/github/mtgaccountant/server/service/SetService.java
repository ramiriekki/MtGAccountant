package com.github.mtgaccountant.server.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.github.mtgaccountant.server.models.Set;

public interface SetService {
    ResponseEntity<List<Set>> getAll();
    ResponseEntity<Set> getSet(String code);
}
