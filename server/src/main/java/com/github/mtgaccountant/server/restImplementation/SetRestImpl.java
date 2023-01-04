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

@RestController
public class SetRestImpl implements SetRest{

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
    
}
