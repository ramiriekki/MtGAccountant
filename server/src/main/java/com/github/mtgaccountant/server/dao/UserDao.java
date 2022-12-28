package com.github.mtgaccountant.server.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.repository.query.Param;

import com.github.mtgaccountant.server.models.User;
import com.github.mtgaccountant.server.wrapper.UserWrapper;

import jakarta.transaction.Transactional;

public interface UserDao extends JpaRepository<User, Integer>{
    User findByEmailId(@Param("email") String email);
    User findByEmail(String email);

    List<UserWrapper> getAllUsers();
    List<String> getAllAdmins();

    @Transactional
    @Modifying
    Integer updateStatus(@Param("status") String status, @Param("id") Integer id);
}
