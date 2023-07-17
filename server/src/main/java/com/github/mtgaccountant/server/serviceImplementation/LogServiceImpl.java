package com.github.mtgaccountant.server.serviceImplementation;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.github.mtgaccountant.server.service.LogService;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class LogServiceImpl implements LogService {

    @Override
    public ResponseEntity<String> log(Map<String, String> requestMap) {
        log.debug("on log request");
        String message = requestMap.get("message");
        String level = requestMap.get("level");

        if (level.equals("info")) {
            log.info(message);
        } else if (level.equals("warn")) { 
            log.warn(message);
        } else if (level.equals("error")) { 
            log.error(message);
        } else if (level.equals("debug")) { 
            log.debug(message);
        }
        
        return new ResponseEntity<String>("OK", HttpStatus.OK);
    }
    
}
