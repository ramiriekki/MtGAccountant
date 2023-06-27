package com.github.mtgaccountant.server.models;

import java.io.Serializable;
import java.util.Date;

import com.github.mtgaccountant.server.wrapper.MinimalUserWrapper;

import lombok.Data;

@Data
public class Message implements Serializable{
    private String content;
    private Date timeSent;
    private MinimalUserWrapper user;
    private String chatId;
}
