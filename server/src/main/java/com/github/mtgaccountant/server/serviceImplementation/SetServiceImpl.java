package com.github.mtgaccountant.server.serviceImplementation;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.github.mtgaccountant.server.dao.SetDao;
import com.github.mtgaccountant.server.models.Set;
import com.github.mtgaccountant.server.service.SetService;
import com.github.mtgaccountant.server.wrapper.SetCodesWrapper;

@Service
public class SetServiceImpl implements SetService{

    @Autowired
    SetDao setDao;

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
    
}
