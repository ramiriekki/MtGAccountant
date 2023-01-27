package com.github.mtgaccountant.server.rest;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.github.mtgaccountant.server.models.ClientSearch;
import com.github.mtgaccountant.server.wrapper.CardSearchWrapper;

@RequestMapping(path = "/api/search")
public interface SearchRest {
    // @GetMapping(path = "/card")
    // public ResponseEntity<List<CardSearchWrapper>> getSearch(
    //     @RequestParam(value = "name", required=false) String name,
    //     @RequestParam(value = "rarities", required=false) String rarities,
    //     @RequestParam(value = "setTypes", required=false) String setTypes,
    //     @RequestParam(value = "minPrice", required=false) String minPrice,
    //     @RequestParam(value = "maxPrice", required=false) String maxPrice,
    //     @RequestParam(value = "sets", required=false) String sets,
    //     @RequestParam(value = "owned", required=false) String owned
    //     );

    @PostMapping(path = "/cards")
    public ResponseEntity<List<CardSearchWrapper>> getSearch(@RequestBody(required = true) ClientSearch clientSearch);
}
