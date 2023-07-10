package com.github.mtgaccountant.server.restImplementation;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;

import org.apache.pdfbox.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.CacheControl;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.github.mtgaccountant.server.rest.ImageRest;
import com.github.mtgaccountant.server.service.ImageService;

@RestController
public class ImageRestImpl implements ImageRest {

    @Autowired
    ImageService imageService;

    @Override
    public ResponseEntity<String> uploadFile(MultipartFile file) {
        try {
            return imageService.uploadImage(file);
        } catch (Exception e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.MULTI_STATUS);
        }
    }

    @Override
    public ResponseEntity<byte[]> getImage(String id) throws IOException {
        try {
            return imageService.getImage(id);
        } catch (Exception e) {
            return new ResponseEntity<byte[]>(new byte[0], HttpStatus.MULTI_STATUS);
        }
    }

}
