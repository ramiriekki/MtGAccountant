package com.github.mtgaccountant.server.utils;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.mtgaccountant.server.constants.MtgAccountantConstants;
import com.github.mtgaccountant.server.dao.CardDao;
import com.github.mtgaccountant.server.wrapper.CardSearchWrapper;
import com.github.mtgaccountant.server.wrapper.CardWrapper;

@Service
public class SearchUtils {
    @Autowired
    CardDao cardDao;

    private SearchUtils() {

    }

    public List<CardWrapper> limitSearchList(List<CardWrapper> cards, String searchField,
            String[] searchValue) {
        List<CardWrapper> result = new ArrayList<>();

        if (searchField.equals(MtgAccountantConstants.RARITY)) {
            for (String value : searchValue) {
                result.addAll(cards.stream().filter(c -> c.getRarity().toLowerCase().contains(value.toLowerCase()))
                        .collect(Collectors.toList()));
            }

            return result;
        }

        if (searchField.equals(MtgAccountantConstants.TYPE)) {
            for (String value : searchValue) {
                result.addAll(cards.stream().filter(c -> c.getSet_type().toLowerCase().contains(value.toLowerCase()))
                        .collect(Collectors.toList()));
            }

            return result;
        }

        if (searchField.equals(MtgAccountantConstants.CODE)) {
            for (String value : searchValue) {
                result.addAll(cards.stream().filter(c -> c.getSet().toLowerCase().contains(value.toLowerCase()))
                        .collect(Collectors.toList()));
            }

            return result;
        }

        return new ArrayList<>();
    }

    public List<CardWrapper> searchByName(List<CardWrapper> cards, String name) {
        return cards.stream()
                .filter(c -> c.getName().toLowerCase().contains(name.toLowerCase())).collect(Collectors.toList());
    }

    public List<CardWrapper> limitSearchListByPrice(List<CardWrapper> cards, Integer minPrice,
            Integer maxPrice) {
        return cards.stream()
                .filter(c -> c.getPrices().getEur() != null && Double.parseDouble(c.getPrices().getEur()) >= minPrice
                        && Double.parseDouble(c.getPrices().getEur()) <= maxPrice)
                .collect(Collectors.toList());
    }

    public List<CardWrapper> limitSearchListByPrice(List<CardWrapper> cards, int minPrice) {
        return cards.stream()
                .filter(c -> c.getPrices().getEur() != null && Double.parseDouble(c.getPrices().getEur()) >= minPrice)
                .collect(Collectors.toList());
    }

    public CardSearchWrapper convertCardWrapperToSearchWrapper(CardWrapper card) {
        return new CardSearchWrapper(
                card.getName(),
                card.getSet(),
                card.getSet_name(),
                card.getSet_type(),
                card.getCollector_number(),
                card.getRarity(),
                card.getPrices(),
                card.getImage_uris(),
                card.getCard_faces());
    }

}
