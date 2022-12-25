package com.github.mtgaccountant.server.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import com.github.mtgaccountant.server.models.User;

public interface UserDao extends JpaRepository<User, Integer>{
    User findByEmailId(@Param("email") String email);
}
