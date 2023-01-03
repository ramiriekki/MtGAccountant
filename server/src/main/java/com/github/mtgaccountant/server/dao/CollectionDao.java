package com.github.mtgaccountant.server.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.github.mtgaccountant.server.models.Collection;

public interface CollectionDao extends JpaRepository<Collection, Integer>{
    
}
