package com.github.mtgaccountant.server.serviceImplementation;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.github.mtgaccountant.server.dao.CardDao;
import com.github.mtgaccountant.server.models.Card;
import com.github.mtgaccountant.server.service.CardTestService;

@Service
public class CardTestServiceImpl implements CardTestService{

    @Autowired
    CardDao cardDao;
    
    @Override
    public ResponseEntity<List<Card>> getAllCards() {
        try {
            System.out.println(cardDao.findAll());
            
            return new ResponseEntity<>(cardDao.findAll(), HttpStatus.OK);
        } catch (Exception e) {
            //sSystem.out.println(cardDao.findAll());
            e.printStackTrace();
            return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
