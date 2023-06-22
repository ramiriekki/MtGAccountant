package com.github.mtgaccountant.server.rest;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.github.mtgaccountant.server.models.Conversation;
import com.github.mtgaccountant.server.models.ConversationForm;

@RequestMapping(path = "/api/chat")
public interface ChatRest {
    @PostMapping(path = "/new")
    public ResponseEntity<Conversation> createNewChat(@RequestBody(required = false) ConversationForm conversation);

    @GetMapping(path = "/get")
    public ResponseEntity<Conversation> getChat(@RequestParam String id);

    @GetMapping(path = "/all")
    public ResponseEntity<List<Conversation>> getAllChats();

    // TODO: getlatestmessage
    // TODO: addMessageToChat
    // TODO: getAllMessages
}
