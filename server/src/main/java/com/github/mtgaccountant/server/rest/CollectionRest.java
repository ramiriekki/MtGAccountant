package com.github.mtgaccountant.server.rest;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.github.mtgaccountant.server.models.Collection;
import com.github.mtgaccountant.server.models.CollectionCountData;
import com.github.mtgaccountant.server.models.SetsProgress;

@RequestMapping(path = "/api/collections")
public interface CollectionRest {
    // Eg. http://localhost:8080/api/collections/collection?email=test.test@gmail.com
    @GetMapping(path = "/collection")
    public ResponseEntity<Collection> getCollection(@RequestParam String email);

    @PostMapping(path = "/collection")
    public ResponseEntity<String> updateCollection(@RequestBody(required = true) Map<String, String[]> requestMap, @RequestParam String email);

    @DeleteMapping(path = "/collection")
    public ResponseEntity<String> deleteCollection(@RequestParam String email);

    @GetMapping(path = "/collection/set")
    public ResponseEntity<CollectionCountData> getCollectionSetCount(@RequestParam String email, @RequestParam String code);

    @GetMapping(path = "/collection/sets-progress")
    public ResponseEntity<List<SetsProgress>> getCollectionSetsProgress(@RequestParam String email);
}
