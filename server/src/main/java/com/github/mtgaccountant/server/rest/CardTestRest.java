package com.github.mtgaccountant.server.rest;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.github.mtgaccountant.server.wrapper.CardWrapper;

@RequestMapping(path = "/cards")
public interface CardTestRest {
    @GetMapping(path = "/get")
    public ResponseEntity<List<CardWrapper>> getAllCards();
}
