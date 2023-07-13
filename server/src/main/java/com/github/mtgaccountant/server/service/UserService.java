package com.github.mtgaccountant.server.service;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;

import com.github.mtgaccountant.server.wrapper.MinimalUserWrapper;
import com.github.mtgaccountant.server.wrapper.UserWrapper;

public interface UserService {
    ResponseEntity<String> signUp(Map<String, String> requestMap);

    ResponseEntity<String> login(Map<String, String> requestMap);

    ResponseEntity<List<UserWrapper>> getAllUsers();

    ResponseEntity<String> update(Map<String, String> requestMap);

    ResponseEntity<String> checkToken();

    ResponseEntity<String> changePassword(Map<String, String> requestMap);

    ResponseEntity<String> forgotPassword(Map<String, String> requestMap);

    ResponseEntity<String> deleteUser(String email);

    ResponseEntity<UserWrapper> getUser(String email);

    ResponseEntity<List<MinimalUserWrapper>> getAllMinUsers();
}
