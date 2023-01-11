package com.github.mtgaccountant.server.serviceImplementation;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.github.mtgaccountant.server.dao.CollectionDao;
import com.github.mtgaccountant.server.dao.UserDao;
import com.github.mtgaccountant.server.jwt.JwtFilter;
import com.github.mtgaccountant.server.models.Collection;
import com.github.mtgaccountant.server.service.CollectionService;
import com.github.mtgaccountant.server.utils.MtgAccountantUtils;
import com.github.mtgaccountant.server.wrapper.CollectionCardWrapper;
import com.github.mtgaccountant.server.wrapper.UserWrapper;

@Service
public class CollectionServiceImpl implements CollectionService{

    @Autowired
    CollectionDao collectionDao;

    @Autowired
    UserDao userDao;

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

            return new ResponseEntity<>(collectionDao.findByUser(user), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return new ResponseEntity<>(new Collection(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> updateCollection(Map<String, String[]> requestMap, String email) {
        try {
            UserWrapper user = userDao.findUser(jwtFilter.getCurrentUser());

            // Check if user email matches param email. If not return unauthorized
            if(!user.getEmail().equals(email)){
                System.out.println("Email param doesn't match users email.");
                return MtgAccountantUtils.getResponseEntity("Email param doesn't match users email.", HttpStatus.UNAUTHORIZED);
            }
            
            // Get users collection from database.
            // Get lists from request (cards to be added and cards to be removed) 
            Collection collection = collectionDao.findByUser(user);
            String[] idList = requestMap.get("id_list");
            String[] removeList = requestMap.get("remove_list");

            //System.out.println(idList[0]);

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
    
}