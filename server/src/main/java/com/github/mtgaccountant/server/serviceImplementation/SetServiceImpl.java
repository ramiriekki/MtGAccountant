package com.github.mtgaccountant.server.serviceImplementation;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.github.mtgaccountant.server.constants.MtgAccountantConstants;
import com.github.mtgaccountant.server.dao.CardDao;
import com.github.mtgaccountant.server.dao.CollectionDao;
import com.github.mtgaccountant.server.dao.SetDao;
import com.github.mtgaccountant.server.dao.UserDao;
import com.github.mtgaccountant.server.jwt.JwtFilter;
import com.github.mtgaccountant.server.models.Collection;
import com.github.mtgaccountant.server.models.Set;
import com.github.mtgaccountant.server.service.SetService;
import com.github.mtgaccountant.server.utils.CollectionUtils;
import com.github.mtgaccountant.server.wrapper.CardWrapper;
import com.github.mtgaccountant.server.wrapper.CollectionCardWrapper;
import com.github.mtgaccountant.server.wrapper.SetCodesWrapper;
import com.github.mtgaccountant.server.wrapper.UserWrapper;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class SetServiceImpl implements SetService {

    @Autowired
    SetDao setDao;

    @Autowired
    CardDao cardDao;

    @Autowired
    UserDao userDao;

    @Autowired
    JwtFilter jwtFilter;

    @Autowired
    CollectionDao collectionDao;

    @Override
    public ResponseEntity<List<Set>> getAll() {
        try {
            return new ResponseEntity<>(setDao.findAll(), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<Set> getSet(String code) {
        try {
            return new ResponseEntity<>(setDao.findByCode(code), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return new ResponseEntity<>(new Set(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<List<SetCodesWrapper>> getSetCodes() {
        try {
            List<SetCodesWrapper> sets = setDao.findAllSetCodesWrappers();

            return new ResponseEntity<>(sets, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<List<Set>> getChildSets(String code) {
        try {
            List<Set> childSets = setDao.findByParentSetCode(code);

            return new ResponseEntity<>(childSets, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<Double> getSetValue(String code, String email) {
        try {
            UserWrapper user = userDao.findUser(jwtFilter.getCurrentUser());

            // Check if user email matches param email. If not return unauthorized
            if (!user.getEmail().equals(email)) {
                log.warn(MtgAccountantConstants.EMAIL_DOESNT_MATCH);
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }

            List<CardWrapper> cards = cardDao.findSetCards(code);
            List<CardWrapper> childSetCards = new ArrayList<>();
            List<Set> childSets = setDao.findByParentSetCode(code);

            for (Set set : childSets) {
                List<CardWrapper> setCards = cardDao.findSetCards(set.getCode());
                childSetCards.addAll(setCards);
            }

            Collection collection = collectionDao.findByFinderID(user.getUsername() + user.getEmail());

            double collectionValue = CollectionUtils.calculateCollectionValue(collection.getCards(), cards);
            collectionValue += CollectionUtils.calculateCollectionValue(collection.getCards(), childSetCards);

            return new ResponseEntity<>(collectionValue, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @Override
    public ResponseEntity<List<CardWrapper>> getTopCards(String code, String email) {
        try {
            List<CardWrapper> cards = cardDao.findSetCards(code);
            List<CardWrapper> childSetCards = new ArrayList<>();
            List<CardWrapper> removeCards = new ArrayList<>();
            List<CardWrapper> returnCards = new ArrayList<>();
            List<Set> childSets = setDao.findByParentSetCode(code);
            Comparator<CardWrapper> priceComparator = (c1, c2) -> Double
                    .compare(Double.parseDouble(c1.getPrices().getEur()), Double.parseDouble(c2.getPrices().getEur()));

            for (Set set : childSets) {
                List<CardWrapper> setCards = cardDao.findSetCards(set.getCode());
                childSetCards.addAll(setCards);
            }
            cards.addAll(childSetCards); // Get all cards to one list

            UserWrapper user = userDao.findUser(jwtFilter.getCurrentUser());

            if (!user.getEmail().equals(email)) {
                log.warn(MtgAccountantConstants.EMAIL_DOESNT_MATCH);
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }

            Collection collection = collectionDao.findByFinderID(user.getUsername() + user.getEmail());

            // Get the cards that are not in users collection and remove them
            for (CardWrapper card : cards) {
                for (CollectionCardWrapper collectionCard : collection.getCards()) {
                    if (!collectionCard.isCollected() && collectionCard.getId().equals(card.getId())) {
                        removeCards.add(card);
                    }
                }
            }
            cards.removeAll(removeCards);

            // Sort the remaining cards and return top 5 cards
            cards.stream().filter(c -> Objects.nonNull(c.getPrices().getEur())).sorted(priceComparator.reversed())
                    .limit(5).forEach(returnCards::add);

            return new ResponseEntity<>(returnCards, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

}
