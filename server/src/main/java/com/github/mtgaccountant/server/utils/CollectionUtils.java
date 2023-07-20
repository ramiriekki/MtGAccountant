package com.github.mtgaccountant.server.utils;

import java.util.List;

import com.github.mtgaccountant.server.wrapper.CardWrapper;
import com.github.mtgaccountant.server.wrapper.CollectionCardWrapper;

public class CollectionUtils {
    public static double calculateCollectionValue(List<CollectionCardWrapper> collectionCards, List<CardWrapper> targetCards) {
        double collectionValue = 0;
        for (CollectionCardWrapper card : collectionCards) {
            for (CardWrapper cardWrapper : targetCards) {
                if (cardWrapper.getId().equals(card.getId()) && card.isCollected() && cardWrapper.getPrices().getEur() != null) {
                    collectionValue += Double.parseDouble(cardWrapper.getPrices().getEur());
                }
            }
        }
        return collectionValue;
    }
}
