package com.github.mtgaccountant.server.restImplementation;

import java.io.File;
import java.io.FileOutputStream;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.github.mtgaccountant.server.rest.ImageRest;

@RestController
public class ImageRestImpl implements ImageRest {

    @Override
    public ResponseEntity<String> uploadFile(MultipartFile file) {
        try {
            File path = new File("/Users/ramiriekkinen/Projects/School/MtGAccountant/server/data/images/"
                    + file.getOriginalFilename());
            path.createNewFile();
            FileOutputStream output = new FileOutputStream(path);
            output.write(file.getBytes());
            output.close();
            return new ResponseEntity<String>("File is uploaded successfully!", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.MULTI_STATUS);
        }
    }

}
