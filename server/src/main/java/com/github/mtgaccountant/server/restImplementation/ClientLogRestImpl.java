package com.github.mtgaccountant.server.restImplementation;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.github.mtgaccountant.server.constants.MtgAccountantConstants;
import com.github.mtgaccountant.server.rest.ClientLogRest;
import com.github.mtgaccountant.server.service.LogService;

@RestController
public class ClientLogRestImpl implements ClientLogRest {
    @Autowired
    private LogService logService;

    @Override
    public ResponseEntity<String> log(Map<String, String> requestMap) {
        try {
            return logService.log(requestMap);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return new ResponseEntity<String>(MtgAccountantConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
}
