package com.github.mtgaccountant.server.service;

import java.util.Map;

import org.springframework.http.ResponseEntity;

public interface LogService {
    ResponseEntity<String> log(Map<String, String> requestMap);
}
