package com.github.mtgaccountant.server.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.query.Param;

import com.github.mtgaccountant.server.models.User;
import com.github.mtgaccountant.server.wrapper.UserWrapper;

import jakarta.transaction.Transactional;

public interface UserDao extends MongoRepository<User, Integer>{
    // User findByEmailId(@Param("email") String email);
    // User findByEmail(String email);

    // List<UserWrapper> getAllUsers();
    // List<String> getAllAdmins();

    // @Transactional
    // @Modifying
    // Integer updateStatus(@Param("status") String status, @Param("id") Integer id);

    @Query("{email:'?0'}")
    User findUserByEmail(String email);
    
    @Query("{ username : '?0' }")
    User findByUsername(String username);
    
    @Query(value="{role:'user'}", fields="{'id' : 1, 'username' : 1, 'email' : 1, 'status' : 1}")
    List<UserWrapper> findAllUsers();

    @Query(value="{role:'admin'}", fields="{'email' : 1}")
    List<String> findAllAdmins();
}
