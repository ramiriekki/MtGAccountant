package com.github.mtgaccountant.server.utils;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;

import com.github.mtgaccountant.server.dao.CardDao;
import com.github.mtgaccountant.server.wrapper.CardSearchWrapper;

public class SearchUtils {
    @Autowired
    CardDao cardDao;

    private SearchUtils() {

    }

    public List<CardSearchWrapper> limitSearchList(List<CardSearchWrapper> cards, String code, String type,
            String rarity) {
        if (code.isEmpty() && type.isEmpty() && rarity.isEmpty()) {
            return cards;
        }

        if (!code.isEmpty() && !type.isEmpty() && !rarity.isEmpty()) {
            return cards.stream().filter(c -> c.getSet().toLowerCase().contains(code.toLowerCase())
                    && c.getSet_type().toLowerCase().contains(type)
                    && c.getRarity().toLowerCase().contains(rarity))
                    .collect(Collectors.toList());
        } else {
            if (!code.isEmpty()) {
                cards = cards.stream().filter(c -> c.getSet().toLowerCase().contains(code.toLowerCase()))
                        .collect(Collectors.toList());
            }

            if (!type.isEmpty()) {
                cards = cards.stream().filter(c -> c.getSet_type().toLowerCase().contains(type))
                        .collect(Collectors.toList());
            }

            if (!rarity.isEmpty()) {
                cards = cards.stream().filter(c -> c.getRarity().toLowerCase().contains(rarity))
                        .collect(Collectors.toList());
            }

            return cards;
        }
    }

    private List<CardSearchWrapper> searchByName(List<CardSearchWrapper> cards, String name) {
        return null;
    }

    public List<CardSearchWrapper> limitSearchListByPrice(List<CardSearchWrapper> cards, String minPrice,
            String maxPrice) {
        return null;
    }
}
