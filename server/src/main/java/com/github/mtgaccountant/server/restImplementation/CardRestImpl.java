package com.github.mtgaccountant.server.restImplementation;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.github.mtgaccountant.server.rest.CardRest;
import com.github.mtgaccountant.server.service.CardService;
import com.github.mtgaccountant.server.wrapper.CardWrapper;

@RestController
public class CardRestImpl implements CardRest{

    @Autowired
    CardService cardService;

    @Override
    public ResponseEntity<List<CardWrapper>> getAllCards() {
        try {
            return cardService.getAllCards();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return new ResponseEntity<List<CardWrapper>>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<CardWrapper> getCard(String cardId) {
        try {
            return cardService.getCard(cardId);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return new ResponseEntity<CardWrapper>(new CardWrapper(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<List<CardWrapper>> getSetCards(String code) {
        try {
            return cardService.getSetCards(code);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return new ResponseEntity<List<CardWrapper>>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
}
