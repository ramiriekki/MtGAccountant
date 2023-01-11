package com.github.mtgaccountant.server.dao;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.github.mtgaccountant.server.models.User;
import com.github.mtgaccountant.server.wrapper.UserWrapper;

public interface UserDao extends MongoRepository<User, Integer>{
    @Query("{email:'?0'}")
    User findUserByEmail(String email);
    
    @Query("{ username : '?0' }")
    User findByUsername(String username);
    
    @Query(value="{role:'user'}", fields="{'id' : 1, 'username' : 1, 'email' : 1, 'status' : 1}")
    List<UserWrapper> findAllUsers();
    
    @Query(value="{email:'?0'}", fields="{'id' : 1, 'username' : 1, 'email' : 1, 'status' : 1}")
    UserWrapper findUser(String email);

    @Query(value="{role:'admin'}", fields="{'email' : 1}")
    List<String> findAllAdmins();
}