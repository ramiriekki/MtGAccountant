package com.github.mtgaccountant.server;

import java.text.MessageFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import com.github.mtgaccountant.server.dao.CardDao;
import com.github.mtgaccountant.server.dao.CollectionDao;
import com.github.mtgaccountant.server.dao.SetDao;
import com.github.mtgaccountant.server.dao.UserDao;
import com.github.mtgaccountant.server.models.Collection;
import com.github.mtgaccountant.server.models.Search;
import com.github.mtgaccountant.server.models.Set;
import com.github.mtgaccountant.server.models.SetSearch;
import com.github.mtgaccountant.server.wrapper.CardWrapper;
import com.github.mtgaccountant.server.wrapper.CollectionCardWrapper;
import com.github.mtgaccountant.server.wrapper.UserWrapper;

@Component
public class ScheduledTasks {
	//TODO update collections task (when there are new cards)

	@Autowired
	MongoTemplate db;

	@Autowired
	CardDao cardDao;

	@Autowired
	SetDao setDao;

	@Autowired
	UserDao userDao;

	@Autowired
	CollectionDao collectionDao;

    private static final SimpleDateFormat dateFormat = new SimpleDateFormat("MM/dd/yyyy HH:mm:ss");

	@Scheduled(cron = "0 0 0 ? * *")
	public void getAllCards() {
		String url = "https://api.scryfall.com/cards/search?q=color:blue+or+color:red+or+color:green+or+color:white+or+color:black+or+color:colorless";
		Integer page = 1;
		List<CardWrapper> cards = new ArrayList<>();
		
		RestTemplate template = new RestTemplate();
		ResponseEntity<Search> response = template.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<Search>(){});
		Search search = response.getBody();
		cards.addAll(search.getData());
		
		//System.out.println(search.getData());
		
		// Paginate trough all pages
		while(search.isHas_more() && !page.equals(4)){
			url = MessageFormat.format("https://api.scryfall.com/cards/search?q=color:blue+or+color:red+or+color:green+or+color:white+or+color:black+or+color:colorless&page={0}", page.toString()) ;
			response = template.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<Search>(){});
			search = response.getBody();
			cards.addAll(search.getData());
			
			System.out.println(page);
			page++;
		}

		//TODO Get the data on the last page
		
		//	System.out.println(cards);
		
		cardDao.saveAll(cards);

		System.out.println("Cards fetched from Scryfall API " + dateFormat.format(new Date()));
	}

	// Fetch set data
	@Scheduled(cron = "0 0 2 ? * *")
	public void getAllSets(){
		String url = "https://api.scryfall.com/sets/";
		List<Set> sets = new ArrayList<>();
		
		RestTemplate template = new RestTemplate();
		ResponseEntity<SetSearch> response = template.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<SetSearch>(){});
		SetSearch search = response.getBody();
		sets.addAll(search.getData());
		
		//System.out.println(sets);
		
		setDao.saveAll(sets);

		System.out.println("Sets fetched from Scryfall API " + dateFormat.format(new Date()));
	}

	// Update collections when there are new cards
	@Scheduled(cron = "0 0 1 ? * *")
	public void updateCollectionCards(){
		// Use the user "update" to find all new cards by comparing
		UserWrapper user = userDao.findUser("update");
		List<CardWrapper> dbCards = cardDao.findAll();	// Get all cards fetched to database
		Collection collectionCards = collectionDao.findByUser(user);	// Find the "update"- users cards
		Boolean isInCollection = false;

		List<CollectionCardWrapper> newCards = new ArrayList<>();

		for (CardWrapper card : dbCards){
			for (CollectionCardWrapper card2 : collectionCards.getCards()){
				if(card.getId().equals(card2.getId())){	// Check if card is in collections already and mark true if is.
					isInCollection = true;
					break;
				}
			}

			// If not in collections, add to new cards list
			if(!isInCollection){
				newCards.add(new CollectionCardWrapper(card.getId(), card.getName(), false));
			}
			isInCollection = false;
		}

		// System.out.println(newCards);

		List<Collection> collections = collectionDao.findAll();

		// Go through all collections and add all new cards
		for (Collection collection : collections){
			List<CollectionCardWrapper> userCards = collection.getCards();
			userCards.addAll(newCards);
			collection.setCards(userCards);
			collectionDao.save(collection);
		}

		System.out.println("Finished updating collections.");
	}

}
