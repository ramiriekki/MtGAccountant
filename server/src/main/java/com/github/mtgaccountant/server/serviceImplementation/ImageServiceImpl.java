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
        try {
            UserWrapper user = userDao.findUser(jwtFilter.getCurrentUser());

            File path = new File(dataPath + "/data/images/"
                    + user.getUsername() + "ProfilePicture.png");
            path.createNewFile();
            FileOutputStream output = new FileOutputStream(path);
            output.write(file.getBytes());
            output.close();
            return new ResponseEntity<String>("File was uploaded successfully!", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.MULTI_STATUS);
        }
    }

    @Override
    public ResponseEntity<byte[]> getImage(String id) throws IOException {
        HttpHeaders headers = new HttpHeaders();
        InputStream in = new FileInputStream(
                dataPath + "/data/images/" + id + "ProfilePicture.png");
        byte[] media = IOUtils.toByteArray(in);
        headers.setCacheControl(CacheControl.noCache().getHeaderValue());
        return new ResponseEntity<byte[]>(media, headers, HttpStatus.OK);
    }
}
