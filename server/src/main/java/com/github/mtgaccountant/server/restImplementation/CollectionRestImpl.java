package com.github.mtgaccountant.server.restImplementation;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.github.mtgaccountant.server.constants.MtgAccountantConstants;
import com.github.mtgaccountant.server.models.Collection;
import com.github.mtgaccountant.server.models.CollectionCountData;
import com.github.mtgaccountant.server.models.SetsProgress;
import com.github.mtgaccountant.server.rest.CollectionRest;
import com.github.mtgaccountant.server.service.CollectionService;
import com.github.mtgaccountant.server.utils.MtgAccountantUtils;
import com.github.mtgaccountant.server.wrapper.CardWrapper;

@RestController
public class CollectionRestImpl implements CollectionRest{

    @Autowired
    CollectionService collectionService;

    @Override
    public ResponseEntity<Collection> getCollection(String email) {
        try {
            return collectionService.getCollection(email);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return new ResponseEntity<Collection>(new Collection(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> updateCollection(Map<String, String[]> requestMap, String email) {
        try {
            return collectionService.updateCollection(requestMap, email);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return MtgAccountantUtils.getResponseEntity(MtgAccountantConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> deleteCollection(String email) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public ResponseEntity<CollectionCountData> getCollectionSetCount(String email, String code) {
        try {
            return collectionService.getCollectionSetCount(email, code);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<CollectionCountData>(new CollectionCountData(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<List<SetsProgress>> getCollectionSetsProgress(String email) {
        try {
            return collectionService.getCollectionSetsProgress(email);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return new ResponseEntity<List<SetsProgress>>(HttpStatus.INTERNAL_SERVER_ERROR);
    
    }

    @Override
    public ResponseEntity<Double> getCollectionValue(String email) {
        try {
            return collectionService.getCollectionValue(email);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return new ResponseEntity<Double>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<CardWrapper> getMostValuableCard(String email) {
        try {
            return collectionService.getMostValuableCard(email);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return new ResponseEntity<CardWrapper>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
}
