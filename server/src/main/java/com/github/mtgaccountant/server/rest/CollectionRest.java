package com.github.mtgaccountant.server.rest;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.github.mtgaccountant.server.models.Collection;

@RequestMapping(path = "/api/collections")
public interface CollectionRest {
    // Eg. http://localhost:8080/api/collections/collection?email=test.test@gmail.com
    @GetMapping(path = "/collection")
    public ResponseEntity<Collection> getCollection(@RequestParam String email);

    @PatchMapping(path = "/collection")
    public ResponseEntity<String> updateCollection(@RequestBody(required = true) Map<String, String[]> requestMap, @RequestParam String email);

    // TODO: Delete User that owns the collection too.
    @DeleteMapping(path = "/collection")
    public ResponseEntity<String> deleteCollection(@RequestParam String email);
}
