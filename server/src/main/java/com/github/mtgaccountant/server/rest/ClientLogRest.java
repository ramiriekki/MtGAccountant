package com.github.mtgaccountant.server.rest;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping(path = "/api/logs")
public interface ClientLogRest {
    @PostMapping(path = "/log")
    public ResponseEntity<String> log(@RequestBody(required = true) Map<String, String> requestMap);
}
