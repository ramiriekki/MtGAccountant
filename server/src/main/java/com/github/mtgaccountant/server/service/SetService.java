package com.github.mtgaccountant.server.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.github.mtgaccountant.server.models.Set;
import com.github.mtgaccountant.server.wrapper.SetCodesWrapper;

public interface SetService {
    ResponseEntity<List<Set>> getAll();
    ResponseEntity<Set> getSet(String code);
    ResponseEntity<List<SetCodesWrapper>> getSetCodes();
    ResponseEntity<List<Set>> getChildSets(String code);
}
