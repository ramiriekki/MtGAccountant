package com.github.mtgaccountant.server.dao;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.github.mtgaccountant.server.models.Set;
import com.github.mtgaccountant.server.wrapper.SetCodesWrapper;

public interface SetDao extends MongoRepository<Set, String>{
    Set findByCode(String code);

    @Query("{parent_set_code:'?0'}")
    List<Set> findByParentSetCode(String code);

    @Query(value="{set_type: { $in: [ 'core', 'expansion'] }}", fields="{'code' : 1, 'name' : 1}")
    List<SetCodesWrapper> findAllSetCodesWrappers();
}
