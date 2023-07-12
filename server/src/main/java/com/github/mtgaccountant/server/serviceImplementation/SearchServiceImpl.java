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
    public ResponseEntity<List<CardSearchWrapper>> searchCards(ClientSearch searchData) {
        log.debug("Search data: {}", searchData);
        try {
            List<CardWrapper> cards = cardDao.findAlCardWrappers();
            List<CardSearchWrapper> searchCards = new ArrayList<>();

            String[] rarities = searchData.getRarities();
            String[] types = searchData.getSetTypes();
            String[] sets = searchData.getSets();
            String[] colors = searchData.getColors();

            if (searchData.getName() != null && !searchData.getName().isEmpty()) {
                cards = searchUtils.searchByName(cards, searchData.getName());
            }

            if (rarities != null && rarities.length != 0) {
                cards = searchUtils.limitSearchList(cards, MtgAccountantConstants.RARITY, rarities);
            }

            if (types != null && types.length != 0) {
                cards = searchUtils.limitSearchList(cards, MtgAccountantConstants.TYPE, types);
            }

            if (sets != null && sets.length != 0) {
                cards = searchUtils.limitSearchList(cards, MtgAccountantConstants.CODE, sets);
            }

            if (colors != null && colors.length != 0) {
                cards = searchUtils.limitSearchList(cards, MtgAccountantConstants.COLORS, colors);
            }

            if (searchData.getMinPrice() != 0 || searchData.getMaxPrice() != 0) {
                if (searchData.getMinPrice() > 0 && searchData.getMaxPrice() == 0) {
                    cards = searchUtils.limitSearchListByPrice(cards, searchData.getMinPrice());
                } else {
                    cards = searchUtils.limitSearchListByPrice(cards, searchData.getMinPrice(),
                            searchData.getMaxPrice());
                }
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
