package com.github.mtgaccountant.server.serviceImplementation;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.github.mtgaccountant.server.dao.CardDao;
import com.github.mtgaccountant.server.models.ClientSearch;
import com.github.mtgaccountant.server.service.SearchService;
import com.github.mtgaccountant.server.wrapper.CardSearchWrapper;
import com.github.mtgaccountant.server.wrapper.CardWrapper;

@Service
public class SearchServiceImpl implements SearchService{

    @Autowired
    CardDao cardDao;

    @Override
    public ResponseEntity<List<CardSearchWrapper>> searchCards(ClientSearch searchData) {

        try {
            List<CardWrapper> cards = cardDao.findAlCardWrappers();
            List<CardWrapper> testCards = cardDao.findAlCardWrappers();
            List<CardSearchWrapper> searchCards = new ArrayList<>();

            String[] rarities = searchData.getRarities();
            String[] types = searchData.getSetTypes();
            String[] sets = searchData.getSets();

            List<CardWrapper> tempcards = new ArrayList<>();

            System.out.println(rarities.length);

            for (CardWrapper cardWrapper : cards) {

                // Name
                if (searchData.getName() != null && searchData.getName() != ""){
                    if (cardWrapper.getName().equals(searchData.getName()) ){
                        System.out.println("found");
                        searchCards.add(convertCardWrapperToSearchWrapper(cardWrapper));
                    }
                }  // After card name search, there shouldn't be more searches as they would be pointless

                //System.out.println("testCards: " + testCards.size());
                
                // TODO Possible fix... instead of adding found cards, remove them instead from the cards List?
                // Rarities
                if (searchData.getRarities() != null && searchData.getRarities().length != 0){

                    if (rarities.length == 4){
                        if (rarities[0].equals(cardWrapper.getRarity()) || rarities[1].equals(cardWrapper.getRarity()) || rarities[2].equals(cardWrapper.getRarity()) || rarities[3].equals(cardWrapper.getRarity())){
                        } else {
                            tempcards.add(cardWrapper);
                        }
                    } else if (rarities.length == 3){
                        if (rarities[0].equals(cardWrapper.getRarity()) || rarities[1].equals(cardWrapper.getRarity()) || rarities[2].equals(cardWrapper.getRarity())){
                        } else {
                            tempcards.add(cardWrapper);
                        }
                    } else if (rarities.length == 2){
                        if (rarities[0].equals(cardWrapper.getRarity()) || rarities[1].equals(cardWrapper.getRarity())){
                        } else {
                            tempcards.add(cardWrapper);
                        }
                    } else if (rarities.length == 1){
                        if (rarities[0].equals(cardWrapper.getRarity())){
                        } else {
                            tempcards.add(cardWrapper);
                        }
                    }

                    //testCards.removeAll(tempcards);
                    //tempcards.clear();
                }

                //System.out.println("testCards: " + testCards.size());
                
                    
                // Set Types
                if (searchData.getSetTypes() != null && searchData.getSetTypes().length != 0){
                    if (types.length == 2){
                        if (types[0].equals(cardWrapper.getSet_type()) || types[1].equals(cardWrapper.getSet_type())){
                        } else {
                            tempcards.add(cardWrapper);
                        }
                    } else if (types.length == 1){
                        if (types[0].equals(cardWrapper.getSet_type())){
                        } else {
                            tempcards.add(cardWrapper);
                        }
                    }
                } else if (cardWrapper.getSet_type().equals("core") || cardWrapper.getSet_type().equals("expansion")){

                } else {
                    tempcards.add(cardWrapper);
                }

                // Sets
                if (searchData.getSets() != null && searchData.getSets().length != 0){
                    if (Arrays.asList(sets).contains(cardWrapper.getSet())){
                    } else {
                        tempcards.add(cardWrapper);
                    }
                }
                        
                // Price
                if (searchData.getMaxPrice() != 0){
                    if(cardWrapper.getPrices().getEur() != null){
                        if (Float.parseFloat(cardWrapper.getPrices().getEur()) > searchData.getMinPrice() && Float.parseFloat(cardWrapper.getPrices().getEur()) < searchData.getMaxPrice()){
                        } else {
                            testCards.remove(cardWrapper);
                        }
                    }
                }
            }

            testCards.removeAll(tempcards);

                                    
            for (CardWrapper cardWrapper : testCards) {
                searchCards.add(convertCardWrapperToSearchWrapper(cardWrapper));
            }
        
            
            System.out.println(searchData);
            return new ResponseEntity<>(searchCards, HttpStatus.OK);
                                    
        } catch (Exception e) {
            // System.out.println(cardDao.findAll());
        
            e.printStackTrace();
            return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private CardSearchWrapper convertCardWrapperToSearchWrapper(CardWrapper card){
        CardSearchWrapper newCard = new CardSearchWrapper(
            card.getName(),
            card.getSet(),
            card.getSet_name(),
            card.getSet_type(),
            card.getCollector_number(),
            card.getRarity(),
            card.getPrices()
            );

        return newCard;
    }
    
}
