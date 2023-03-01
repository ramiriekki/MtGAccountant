package com.github.mtgaccountant.server.jwt;

import java.util.ArrayList;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.github.mtgaccountant.server.dao.UserDao;

@Service
public class CustomerUserDetailsService implements UserDetailsService{

    @Autowired
    UserDao userDao;

    private com.github.mtgaccountant.server.models.User userDetails;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        userDetails = userDao.findUserByEmail(username);

        if (!Objects.isNull(userDetails)){
            return new User(userDetails.getEmail(), userDetails.getPassword(), new ArrayList<>());
        } else {
            throw new UsernameNotFoundException("User not found.");
        }
    }

    public com.github.mtgaccountant.server.models.User getUserDetails(){
        return userDetails;
    }
    

}
