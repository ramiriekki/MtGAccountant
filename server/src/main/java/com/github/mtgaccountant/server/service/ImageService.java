package com.github.mtgaccountant.server.service;

import java.io.FileNotFoundException;
import java.io.IOException;

import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

public interface ImageService {
    ResponseEntity<String> uploadImage(MultipartFile file);

    ResponseEntity<byte[]> getImage(String id) throws FileNotFoundException, IOException;
}
