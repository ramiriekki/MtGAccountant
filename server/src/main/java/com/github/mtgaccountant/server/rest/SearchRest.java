package com.github.mtgaccountant.server.rest;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.github.mtgaccountant.server.wrapper.CardSearchWrapper;

@RequestMapping(path = "/api/search")
public interface SearchRest {
    @GetMapping(path = "/cards")
    public ResponseEntity<List<CardSearchWrapper>> getSearch(
            @RequestParam(required = false, name = "name") String name,
            @RequestParam(required = false, name = "rarities") String[] rarities,
            @RequestParam(required = false, name = "setTypes") String[] setTypes,
            @RequestParam(required = false, name = "minPrice") Integer minPrice,
            @RequestParam(required = false, name = "maxPrice") Integer maxPrice,
            @RequestParam(required = false, name = "sets") String[] sets,
            @RequestParam(required = false, name = "colors") String[] colors,
            @RequestParam(required = false, name = "owned") String owned);
    // public ResponseEntity<List<CardSearchWrapper>>
    // getSearch(@RequestBody(required = true) ClientSearch clientSearch);
}
