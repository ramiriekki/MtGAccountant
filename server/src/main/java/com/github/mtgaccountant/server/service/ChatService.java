package com.github.mtgaccountant.server.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.github.mtgaccountant.server.models.Conversation;
import com.github.mtgaccountant.server.models.ConversationForm;

public interface ChatService {
    ResponseEntity<Conversation> createChat(ConversationForm conversation);

    ResponseEntity<Conversation> getChat(String id);
    
    ResponseEntity<List<Conversation>> getAllChats();
}
