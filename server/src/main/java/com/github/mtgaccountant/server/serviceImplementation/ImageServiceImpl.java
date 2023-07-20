package com.github.mtgaccountant.server.serviceImplementation;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;

import org.apache.pdfbox.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.CacheControl;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.github.mtgaccountant.server.dao.UserDao;
import com.github.mtgaccountant.server.jwt.JwtFilter;
import com.github.mtgaccountant.server.service.ImageService;
import com.github.mtgaccountant.server.wrapper.UserWrapper;

@Service
public class ImageServiceImpl implements ImageService {

    @Autowired
    UserDao userDao;

    @Autowired
    JwtFilter jwtFilter;

    @Value("${mtg.accountant.data.path}")
    private String dataPath;

    @Override
    public ResponseEntity<String> uploadImage(MultipartFile file) {
        FileOutputStream output = null;
        try {
            UserWrapper user = userDao.findUser(jwtFilter.getCurrentUser());

            File path = new File(dataPath + "/data/images/"
                    + user.getUsername() + "ProfilePicture.png");
            if (path.createNewFile()) {
                output = new FileOutputStream(path);
                output.write(file.getBytes());

                return new ResponseEntity<>("File was uploaded successfully!", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("File already exists!", HttpStatus.MULTI_STATUS);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.MULTI_STATUS);
        } finally {
            try {
                if (output!= null)
                    output.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    @Override
    public ResponseEntity<byte[]> getImage(String id) throws IOException {
        HttpHeaders headers = new HttpHeaders();
        InputStream in = new FileInputStream(
                dataPath + "/data/images/" + id + "ProfilePicture.png");
        byte[] media = IOUtils.toByteArray(in);
        headers.setCacheControl(CacheControl.noCache().getHeaderValue());
        return new ResponseEntity<>(media, headers, HttpStatus.OK);
    }
}
