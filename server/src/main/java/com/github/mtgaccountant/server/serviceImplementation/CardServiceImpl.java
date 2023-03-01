package com.github.mtgaccountant.server.serviceImplementation;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.github.mtgaccountant.server.dao.CardDao;
import com.github.mtgaccountant.server.service.CardService;
import com.github.mtgaccountant.server.wrapper.CardWrapper;

@Service
public class CardServiceImpl implements CardService{

    @Autowired
    CardDao cardDao;

    @Override
    public ResponseEntity<List<CardWrapper>> getAllCards() {
        try {
            return new ResponseEntity<>(cardDao.findAll(), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<CardWrapper> getCard(String cardId) {
        try {
            return new ResponseEntity<>(cardDao.findCardById(cardId), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(new CardWrapper(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<List<CardWrapper>> getSetCards(String code) {
        try {
            return new ResponseEntity<>(cardDao.findSetCards(code), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
