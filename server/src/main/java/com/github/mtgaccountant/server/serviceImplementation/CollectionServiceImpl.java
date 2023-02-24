package com.github.mtgaccountant.server.serviceImplementation;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.github.mtgaccountant.server.dao.CollectionDao;
import com.github.mtgaccountant.server.dao.SetDao;
import com.github.mtgaccountant.server.dao.UserDao;
import com.github.mtgaccountant.server.jwt.JwtFilter;
import com.github.mtgaccountant.server.models.Collection;
import com.github.mtgaccountant.server.models.CollectionCountData;
import com.github.mtgaccountant.server.models.Set;
import com.github.mtgaccountant.server.models.SetsProgress;
import com.github.mtgaccountant.server.service.CollectionService;
import com.github.mtgaccountant.server.utils.MtgAccountantUtils;
import com.github.mtgaccountant.server.wrapper.CollectionCardWrapper;
import com.github.mtgaccountant.server.wrapper.UserWrapper;

// BUG user can either modify collection or see the admin board 
@Service
public class CollectionServiceImpl implements CollectionService{

    @Autowired
    CollectionDao collectionDao;

    @Autowired
    UserDao userDao;

    @Autowired
    SetDao setDao;

    @Autowired
    JwtFilter jwtFilter;

    @Override
    public ResponseEntity<Collection> getCollection(String email) {
        System.out.println("Inside collection service.");
        try {
            UserWrapper user = userDao.findUser(jwtFilter.getCurrentUser());

            // Check if user email matches param email. If not return unauthorized
            if(!user.getEmail().equals(email)){
                System.out.println("Email param doesn't match users email.");
                return new ResponseEntity<>(new Collection(), HttpStatus.UNAUTHORIZED);
            }

            //System.out.println(collectionDao.findByUser(user));

            return new ResponseEntity<>(collectionDao.findByFinderID(user.getUsername() + user.getEmail()), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return new ResponseEntity<>(new Collection(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> updateCollection(Map<String, String[]> requestMap, String email) {
        try {
            UserWrapper user = userDao.findUser(jwtFilter.getCurrentUser());

            System.out.println("User: " + user);

            // Check if user email matches param email. If not return unauthorized
            if(!user.getEmail().equals(email)){
                System.out.println("Email param doesn't match users email.");
                return MtgAccountantUtils.getResponseEntity("Email param doesn't match users email.", HttpStatus.UNAUTHORIZED);
            }
            
            // Get users collection from database.
            // Get lists from request (cards to be added and cards to be removed) 
            Collection collection = collectionDao.findByFinderID(user.getUsername() + user.getEmail()); // TODO generate unique id
            String[] idList = requestMap.get("id_list");
            String[] removeList = requestMap.get("remove_list");

            // for (String id : idList) {
            //     System.out.println(id);
            // }

            // Update cards property collected
            for (CollectionCardWrapper card : collection.getCards()){
                for (String id : idList){
                    if (card.getId().equals(id)){
                        //System.out.println("Found!");
                        card.setCollected(true);
                    }
                }

                for (String id : removeList){
                    if (card.getId().equals(id)){
                        card.setCollected(false);
                    }
                }
            }

            collectionDao.save(collection);

            return MtgAccountantUtils.getResponseEntity("Collection updated succesfully.", HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
        }
        
        return MtgAccountantUtils.getResponseEntity("Bad Request.", HttpStatus.BAD_REQUEST);
    }

    /*
     * Get users collection with email param. 
     * Retrieve the cards array from collection and iterate through
     * -> If cards set code matches code param increase collectedCount
     * Returns Integer of how many unique cards in collection in a certain set user has aquired.
     */
    @Override
    public ResponseEntity<CollectionCountData> getCollectionSetCount(String email, String code) {
        UserWrapper user = userDao.findUser(jwtFilter.getCurrentUser());
        Integer collectedCount = 0;
        Integer totalCount;

        // System.out.println("Code: "  + code);
        // System.out.println("email: "  + email);

        if(!user.getEmail().equals(email)){
            System.out.println("Email param doesn't match users email.");
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        Collection collection = collectionDao.findByFinderID(user.getUsername() + user.getEmail());  
        List<CollectionCardWrapper> cards = collection.getCards();

        // Get total cards amount
        totalCount = setDao.findByCode(code).getCard_count();
        // response.add(totalCount);

        // Count cards that are collected
        for (CollectionCardWrapper card : cards) {

            //System.out.println(card.getSet() + " - " + code);

            if (card.getSet().equals(code)){
                // System.out.println("found");
                if (card.isCollected() == true){
                    collectedCount++;
                }
            } else {
                //System.out.println("not found");
            }
        }

        // response.add(collectedCount);

        CollectionCountData response = new CollectionCountData();
        response.setCollected(collectedCount);
        response.setTotalCount(totalCount);


        System.out.println(collectedCount);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<SetsProgress>> getCollectionSetsProgress(String email) {
        UserWrapper user = userDao.findUser(jwtFilter.getCurrentUser());
        List<Set> sets;
        List<SetsProgress> progressList = new ArrayList<>();

        if(!user.getEmail().equals(email)){
            System.out.println("Email param doesn't match users email.");
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        Collection collection = collectionDao.findByFinderID(user.getUsername() + user.getEmail());  
        List<CollectionCardWrapper> cards = collection.getCards();
        sets = setDao.findAll();

        for (Set set : sets) {
            progressList.add(new SetsProgress(set.getCode(), set.getCard_count(), 0));
        }

        for (SetsProgress setsProgress : progressList) {
            Integer collectedCount = 0;
            for (CollectionCardWrapper card : cards) {

                if (card.getSet().equals(setsProgress.getCode())){
                    if (card.isCollected() == true){
                        //System.out.println("collected++");
                        collectedCount++;
                    }
                } 
            }

            //System.out.println(setsProgress.getCode() + " - " + collectedCount);
            
            if (setsProgress.getTotalCount() != 0) {
                //System.out.println("Set:" + setsProgress.getCode() + " - Collected: " +  collectedCount + " - Total: " + setsProgress.getTotalCount());
                Float progress = (collectedCount.floatValue() / setsProgress.getTotalCount().floatValue())*100;
                //System.out.println("Progress: " + progress.intValue());
                setsProgress.setProgress(progress.intValue());
            }
        }

        return new ResponseEntity<>(progressList, HttpStatus.OK);
    }
    
}
