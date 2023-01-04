package com.github.mtgaccountant.server.serviceImplementation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.github.mtgaccountant.server.dao.CollectionDao;
import com.github.mtgaccountant.server.dao.UserDao;
import com.github.mtgaccountant.server.jwt.JwtFilter;
import com.github.mtgaccountant.server.models.Collection;
import com.github.mtgaccountant.server.service.CollectionService;
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

            return new ResponseEntity<>(collectionDao.findByUser(user), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return new ResponseEntity<>(new Collection(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
}
