package com.github.mtgaccountant.server.restImplementation;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.github.mtgaccountant.server.rest.CardTestRest;
import com.github.mtgaccountant.server.service.CardTestService;
import com.github.mtgaccountant.server.wrapper.CardWrapper;

@RestController
public class CardRestTestImpl implements CardTestRest{

    @Autowired
    CardTestService cardTestService;
    
    @Override
    public ResponseEntity<List<CardWrapper>> getAllCards() {
        try {
            return cardTestService.getAllCards();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return new ResponseEntity<List<CardWrapper>>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
}