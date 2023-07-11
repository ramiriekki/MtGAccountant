package com.github.mtgaccountant.server.rest;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.github.mtgaccountant.server.models.ClientSearch;
import com.github.mtgaccountant.server.wrapper.CardSearchWrapper;

@RequestMapping(path = "/api/search")
public interface SearchRest {
    @PostMapping(path = "/cards")
    public ResponseEntity<List<CardSearchWrapper>> getSearch(@RequestBody(required = true) ClientSearch clientSearch);
}
