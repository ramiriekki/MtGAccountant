package com.github.mtgaccountant.server.rest;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.github.mtgaccountant.server.wrapper.CardWrapper;

@RequestMapping(path = "/api/cards")
public interface CardRest {
    @GetMapping(path = "/all-cards")
    public ResponseEntity<List<CardWrapper>> getAllCards();

    // Eg. http://localhost:8080/api/cards/card?cardId=fjkasnfaksjfn124hj23btk
    @GetMapping(path = "/card")
    public ResponseEntity<CardWrapper> getCard(@RequestParam String cardId);

    // Eg. http://localhost:8080/api/cards/set?code=aer
    @GetMapping(path = "/set")
    public ResponseEntity<List<CardWrapper>> getSetCards(@RequestParam String code);
}
