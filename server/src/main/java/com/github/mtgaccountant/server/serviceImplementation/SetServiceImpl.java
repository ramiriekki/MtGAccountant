package com.github.mtgaccountant.server.serviceImplementation;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.github.mtgaccountant.server.dao.CardDao;
import com.github.mtgaccountant.server.dao.CollectionDao;
import com.github.mtgaccountant.server.dao.SetDao;
import com.github.mtgaccountant.server.dao.UserDao;
import com.github.mtgaccountant.server.jwt.JwtFilter;
import com.github.mtgaccountant.server.models.Collection;
import com.github.mtgaccountant.server.models.Set;
import com.github.mtgaccountant.server.service.SetService;
import com.github.mtgaccountant.server.wrapper.CardWrapper;
import com.github.mtgaccountant.server.wrapper.CollectionCardWrapper;
import com.github.mtgaccountant.server.wrapper.SetCodesWrapper;
import com.github.mtgaccountant.server.wrapper.UserWrapper;

@Service
public class SetServiceImpl implements SetService{

    @Autowired
    SetDao setDao;

    @Autowired
    CardDao cardDao;

    @Autowired
    UserDao userDao;

    @Autowired
    JwtFilter jwtFilter;

    @Autowired
    CollectionDao collectionDao;

    @Override
    public ResponseEntity<List<Set>> getAll() {
        try {
            return new ResponseEntity<>(setDao.findAll(), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<Set> getSet(String code) {
        try {
            return new ResponseEntity<>(setDao.findByCode(code), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return new ResponseEntity<>(new Set(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<List<SetCodesWrapper>> getSetCodes() {
        try {
            // List<Set> sets = setDao.findAll();
            // List<String> codes = new ArrayList<>();

            List<SetCodesWrapper> sets = setDao.findAllSetCodesWrappers();

            // for (Set set : sets) {
            //     codes.add(set.getCode());
            // }

            // System.out.println(codes);

            return new ResponseEntity<>(sets, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<List<Set>> getChildSets(String code) {
        try {
            List<Set> childSets = setDao.findByParentSetCode(code);

            return new ResponseEntity<List<Set>>(childSets, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<Double> getSetValue(String code, String email) {
        try {
            List<CardWrapper> cards = cardDao.findSetCards(code);
            List<CardWrapper> childSetCards = new ArrayList<>();
            List<Set> childSets = setDao.findByParentSetCode(code);

            for (Set set : childSets) {
                List<CardWrapper> setCards = cardDao.findSetCards(set.getCode());
                childSetCards.addAll(setCards);
            }

            UserWrapper user = userDao.findUser(jwtFilter.getCurrentUser());
            double collectionValue = 0;

            // Check if user email matches param email. If not return unauthorized
            if(!user.getEmail().equals(email)){
                System.out.println("Email param doesn't match users email.");
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }
            
            // Get users collection from database.
            Collection collection = collectionDao.findByFinderID(user.getUsername() + user.getEmail());

            for (CollectionCardWrapper card : collection.getCards()) {
                for (CardWrapper cardWrapper : cards) {
                    if (cardWrapper.getId().equals(card.getId())){
                        if (card.isCollected() && cardWrapper.getPrices().getEur() != null){
                            collectionValue = collectionValue + Double.parseDouble(cardWrapper.getPrices().getEur()) ;
                        }
                    }
                }
            }

            for (CollectionCardWrapper card : collection.getCards()) {
                for (CardWrapper cardWrapper : childSetCards) {
                    if (cardWrapper.getId().equals(card.getId())){
                        if (card.isCollected() && cardWrapper.getPrices().getEur() != null){
                            collectionValue = collectionValue + Double.parseDouble(cardWrapper.getPrices().getEur()) ;
                        }
                    }
                }
            }

            System.out.println(collectionValue);

            return new ResponseEntity<Double>(collectionValue , HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<Double>(HttpStatus.BAD_REQUEST);
    }
    
}
