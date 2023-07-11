package com.github.mtgaccountant.server.serviceImplementation;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.github.mtgaccountant.server.constants.MtgAccountantConstants;
import com.github.mtgaccountant.server.dao.ChatDao;
import com.github.mtgaccountant.server.dao.UserDao;
import com.github.mtgaccountant.server.jwt.JwtFilter;
import com.github.mtgaccountant.server.models.Conversation;
import com.github.mtgaccountant.server.models.ConversationForm;
import com.github.mtgaccountant.server.models.Message;
import com.github.mtgaccountant.server.service.ChatService;
import com.github.mtgaccountant.server.wrapper.MinimalUserWrapper;
import com.github.mtgaccountant.server.wrapper.UserWrapper;

@Service
public class ChatServiceImpl implements ChatService {

    @Autowired
    ChatDao chatDao;

    @Autowired
    UserDao userDao;

    @Autowired
    JwtFilter jwtFilter;

    @Override
    public ResponseEntity<Conversation> createChat(ConversationForm conversation) {
        try {
            List<UserWrapper> users = new ArrayList<>();
            for (String user : conversation.getParticipants()) {
                users.add(userDao.findUserWrapperByEmail(user));
            }

            UserWrapper currentUser = userDao.findUser(jwtFilter.getCurrentUser());

            Conversation newChat = new Conversation();
            newChat.setIsPrivate(conversation.getIsPrivate());
            newChat.setParticipants(users);
            newChat.setTitle(conversation.getTitle());
            newChat.setMessages(new ArrayList<>());
            newChat.setOwner(currentUser);

            return new ResponseEntity<>(chatDao.save(newChat), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<Conversation>(new Conversation(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<Conversation> getChat(String id) {
        try {
            return new ResponseEntity<>(chatDao.findById(id).get(), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<Conversation>(new Conversation(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<List<Conversation>> getAllChats() {
        try {
            return new ResponseEntity<>(chatDao.findAll(), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<Message> registerMessage(Message message) {
        try {
            if (message.getContent() != null && message.getContent() != "") {
                MinimalUserWrapper user = userDao.findMinUserByEmail(jwtFilter.getCurrentUser());

                Conversation chat = chatDao.findById(message.getChatId()).get();
                List<Message> messages = chat.getMessages();
                message.setUser(user);
                messages.add(message);
                chat.setMessages(messages);
                chatDao.save(chat);

                return new ResponseEntity<>(message, HttpStatus.OK);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<Message>(new Message(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> removeChat(String id) {
        try {
            Conversation chat = chatDao.findById(id).get();
            chatDao.delete(chat);

            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<String>(MtgAccountantConstants.SOMETHING_WENT_WRONG,
                HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
