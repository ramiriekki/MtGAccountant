package com.github.mtgaccountant.server.restImplementation;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.github.mtgaccountant.server.models.Set;
import com.github.mtgaccountant.server.rest.SetRest;
import com.github.mtgaccountant.server.service.SetService;
import com.github.mtgaccountant.server.wrapper.CardWrapper;
import com.github.mtgaccountant.server.wrapper.SetCodesWrapper;

@RestController
public class SetRestImpl implements SetRest {

    @Autowired
    SetService setService;

    @Override
    public ResponseEntity<List<Set>> getAllSets() {
        try {
            return setService.getAll();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return new ResponseEntity<List<Set>>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<Set> getSet(String code) {
        try {
            return setService.getSet(code);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return new ResponseEntity<Set>(new Set(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<List<SetCodesWrapper>> getSetCodes() {
        try {
            return setService.getSetCodes();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return new ResponseEntity<List<SetCodesWrapper>>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<List<Set>> getChildSets(String code) {
        try {
            return setService.getChildSets(code);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return new ResponseEntity<List<Set>>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<Double> getsetValue(String code, String email) {
        try {
            return setService.getSetValue(code, email);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return new ResponseEntity<Double>(0.0, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<List<CardWrapper>> getTopCards(String code, String email) {
        try {
            return setService.getTopCards(code, email);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return new ResponseEntity<List<CardWrapper>>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
