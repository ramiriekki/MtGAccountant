package com.github.mtgaccountant.server.rest;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.github.mtgaccountant.server.models.Set;
import com.github.mtgaccountant.server.wrapper.CardWrapper;
import com.github.mtgaccountant.server.wrapper.SetCodesWrapper;

@RequestMapping(path = "/api/sets")
public interface SetRest {
    @GetMapping(path = "/all")
    public ResponseEntity<List<Set>> getAllSets();

    // Eg. http://localhost:8080/api/sets/set?code=aer
    @GetMapping(path = "/set")
    public ResponseEntity<Set> getSet(@RequestParam String code);

    @GetMapping(path = "/codes")
    public ResponseEntity<List<SetCodesWrapper>> getSetCodes();

    @GetMapping(path = "/child-sets")
    public ResponseEntity<List<Set>> getChildSets(@RequestParam String code);

    @GetMapping(path = "/set/value")
    public ResponseEntity<Double> getsetValue(@RequestParam String code, @RequestParam String email);

    @GetMapping(path = "/set/top-cards")
    public ResponseEntity<List<CardWrapper>> getTopCards(@RequestParam String code, @RequestParam String email);
}
