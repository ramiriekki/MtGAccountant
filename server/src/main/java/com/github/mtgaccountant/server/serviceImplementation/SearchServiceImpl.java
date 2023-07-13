package com.github.mtgaccountant.server.serviceImplementation;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.github.mtgaccountant.server.constants.MtgAccountantConstants;
import com.github.mtgaccountant.server.dao.CardDao;
import com.github.mtgaccountant.server.models.ClientSearch;
import com.github.mtgaccountant.server.service.SearchService;
import com.github.mtgaccountant.server.utils.SearchUtils;
import com.github.mtgaccountant.server.wrapper.CardSearchWrapper;
import com.github.mtgaccountant.server.wrapper.CardWrapper;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class SearchServiceImpl implements SearchService {

    @Autowired
    CardDao cardDao;

    @Autowired
    SearchUtils searchUtils;

    @Override
    public ResponseEntity<List<CardSearchWrapper>> searchCards(String name, String[] rarities, String[] setTypes,
            Integer minPrice, Integer maxPrice, String[] sets, String[] colors, String owned) {
        log.debug("Search data: {}",
                new ClientSearch(name, rarities, setTypes, minPrice, maxPrice, sets, colors, owned));
        try {
            List<CardWrapper> cards = cardDao.findAlCardWrappers();
            List<CardSearchWrapper> searchCards = new ArrayList<>();

            if (name != null && !name.isEmpty() && !name.equals("null")) {
                cards = searchUtils.searchByName(cards, name);
            }

            if (rarities != null && rarities.length != 0 && !rarities[0].equals("null")) {
                cards = searchUtils.limitSearchList(cards, MtgAccountantConstants.RARITY, rarities);
            }

            if (setTypes != null && setTypes.length != 0 && !setTypes[0].equals("null")) {
                cards = searchUtils.limitSearchList(cards, MtgAccountantConstants.TYPE, setTypes);
            }

            if (sets != null && sets.length != 0 && !sets[0].equals("null")) {
                cards = searchUtils.limitSearchList(cards, MtgAccountantConstants.CODE, sets);
            }

            if (colors != null && colors.length != 0 && !colors[0].equals("null")) {
                cards = searchUtils.limitSearchList(cards, MtgAccountantConstants.COLORS, colors);
            }

            if (minPrice != 0 || maxPrice != 0) {
                if (minPrice > 0 && maxPrice == 0) {
                    cards = searchUtils.limitSearchListByPrice(cards, minPrice);
                } else {
                    cards = searchUtils.limitSearchListByPrice(cards, minPrice,
                            maxPrice);
                }
            }

            if (owned != null && !owned.equals("null")) {
                cards = searchUtils.limitOwned(cards, owned);
            }

            for (CardWrapper cardWrapper : cards) {
                searchCards.add(searchUtils.convertCardWrapperToSearchWrapper(cardWrapper));
            }

            if (!searchCards.isEmpty()) {
                return new ResponseEntity<>(searchCards, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(new ArrayList<>(), HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
