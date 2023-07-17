package com.github.mtgaccountant.server.restImplementation;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.github.mtgaccountant.server.rest.SearchRest;
import com.github.mtgaccountant.server.service.SearchService;
import com.github.mtgaccountant.server.wrapper.CardSearchWrapper;

@RestController
public class SearchRestImpl implements SearchRest {

    @Autowired
    SearchService searchService;

    @Override
    public ResponseEntity<List<CardSearchWrapper>> getSearch(String name, String[] rarities, String[] setTypes,
            Integer minPrice, Integer maxPrice, String[] sets, String[] colors, String owned) {
        try {
            return searchService.searchCards(name, rarities, setTypes, minPrice,
                    maxPrice, sets, colors, owned);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<List<CardSearchWrapper>>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
