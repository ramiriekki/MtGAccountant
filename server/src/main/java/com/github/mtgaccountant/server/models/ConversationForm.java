package com.github.mtgaccountant.server.models;

import java.util.List;

import lombok.Data;

@Data
public class ConversationForm {
    private String title;
    private List<String> participants;
    private Boolean isPrivate;
}
