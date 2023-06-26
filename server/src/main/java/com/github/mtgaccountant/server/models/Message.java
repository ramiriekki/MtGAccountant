package com.github.mtgaccountant.server.models;

import java.io.Serializable;
import java.util.Date;

import lombok.Data;

@Data
public class Message implements Serializable{
    private String content;
    private Date timeSent;
    private User user;
    private String chatId;
}
