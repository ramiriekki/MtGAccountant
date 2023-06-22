package com.github.mtgaccountant.server.models;

import java.io.Serializable;
import java.util.List;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document("chats")
public class Conversation implements Serializable {
    private String _id;
    private String title;
    private List<User> participants;
    private List<Message> messages;
    private Boolean isPrivate;
}
