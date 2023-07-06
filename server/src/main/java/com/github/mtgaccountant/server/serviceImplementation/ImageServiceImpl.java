package com.github.mtgaccountant.server.serviceImplementation;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;

import org.apache.pdfbox.io.IOUtils;
import org.springframework.http.CacheControl;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.github.mtgaccountant.server.service.ImageService;

@Service
public class ImageServiceImpl implements ImageService {

    @Override
    public ResponseEntity<String> uploadImage(MultipartFile file) {
        try {
            File path = new File("/Users/ramiriekkinen/Projects/School/MtGAccountant/server/data/images/"
                    + file.getOriginalFilename()); // TODO: save with username prefix
            path.createNewFile();
            FileOutputStream output = new FileOutputStream(path);
            output.write(file.getBytes());
            output.close();
            return new ResponseEntity<String>("File is uploaded successfully!", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.MULTI_STATUS);
        }
    }

    @Override
    public ResponseEntity<byte[]> getImage(String id) throws IOException {
        HttpHeaders headers = new HttpHeaders();
        // TODO: fetch with username prefix with requestparameter
        InputStream in = new FileInputStream(
                "/Users/ramiriekkinen/Projects/School/MtGAccountant/server/data/images/angular_architecture.png");
        byte[] media = IOUtils.toByteArray(in);
        headers.setCacheControl(CacheControl.noCache().getHeaderValue());
        return new ResponseEntity<byte[]>(media, headers, HttpStatus.OK);
    }

}
