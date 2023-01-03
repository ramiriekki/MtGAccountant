package com.github.mtgaccountant.server.models;

import java.io.Serializable;
import java.util.List;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@DynamicUpdate
@DynamicInsert
@Table(name = "collections")
public class Collection implements Serializable{
    private static final long serialVersionUID = 1L;

    // TODO: Copy columns from Card to here and add user and is_in_collection 

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "user")
    private User user;

    @Column(name = "cards")
    @Lob
    private List<Card> cards;

    // @ManyToOne
    // @JoinColumn(name = "card")
    // private Card card;
}
