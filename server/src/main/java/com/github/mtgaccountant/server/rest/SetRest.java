package com.github.mtgaccountant.server.rest;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.github.mtgaccountant.server.models.Set;

@RequestMapping(path = "/api/sets")
public interface SetRest {
    @GetMapping(path = "/all")
    public ResponseEntity<List<Set>> getAllSets();

    // Eg. http://localhost:8080/api/sets/set?code=aer
    @GetMapping(path = "/set")
    public ResponseEntity<Set> getSet(@RequestParam String code);
}
