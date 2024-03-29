package com.github.mtgaccountant.server.restImplementation;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.github.mtgaccountant.server.constants.MtgAccountantConstants;
import com.github.mtgaccountant.server.models.Conversation;
import com.github.mtgaccountant.server.models.ConversationForm;
import com.github.mtgaccountant.server.models.Message;
import com.github.mtgaccountant.server.rest.ChatRest;
import com.github.mtgaccountant.server.service.ChatService;

@RestController
public class ChatRestImpl implements ChatRest {

    @Autowired
    ChatService chatService;

    @Override
    public ResponseEntity<Conversation> createNewChat(ConversationForm conversation) {
        try {
            return chatService.createChat(conversation);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return new ResponseEntity<Conversation>(new Conversation(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<Conversation> getChat(String id) {
        try {
            return chatService.getChat(id);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return new ResponseEntity<Conversation>(new Conversation(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<List<Conversation>> getAllChats() {
        try {
            return chatService.getAllChats();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return new ResponseEntity<List<Conversation>>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<Message> registerMessage(Message message) {
        try {
            return chatService.registerMessage(message);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return new ResponseEntity<Message>(new Message(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> removeChat(String id) {
        try {
            return chatService.removeChat(id);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return new ResponseEntity<String>(MtgAccountantConstants.SOMETHING_WENT_WRONG,
                HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
