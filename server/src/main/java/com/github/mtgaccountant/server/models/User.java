package com.github.mtgaccountant.server.models;

import java.io.Serializable;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.NamedQuery;
import jakarta.persistence.Table;
import lombok.Data;

// @NamedQuery(name = "User.findByEmailId", query = "SELECT u FROM User u WHERE u.email=:email")

// @NamedQuery(name = "User.getAllUsers", query = "SELECT new com.github.mtgaccountant.server.wrapper.UserWrapper(u.id, u.username, u.email, u.status) from User u where u.role = 'user'")

// @NamedQuery(name = "User.getAllAdmins", query = "SELECT u.email from User u where u.role = 'admin'")

// @NamedQuery(name = "User.updateStatus", query = "UPDATE User u SET u.status=:status where u.id=:id")

@Data
@Document("users")
// @Entity
// @DynamicUpdate
// @DynamicInsert
// @Table(name = "users")
public class User implements Serializable{
    private static final long serialVersionUID = 1L;

    @Id
    //@GeneratedValue(strategy = GenerationType.IDENTITY)
    //@Column(name = "id")
    private String _id;

    //@Column(name = "username")
    private String username;

    //@Column(name = "email")
    private String email;

    //@Column(name = "password")
    private String password;

    //@Column(name = "status")
    private String status;

    //@Column(name = "role")
    private String role;
}
