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

import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class ScheduledTasks {
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

	private SimpleDateFormat dateFormat = new SimpleDateFormat("MM/dd/yyyy HH:mm:ss");

	@Scheduled(cron = "0 0 0 ? * *")
	// @Scheduled(cron = "0/30 * * * * *")
	public void getAllCards() {
		String url = "https://api.scryfall.com/cards/search?q=set_type:token+or+set_type:core+or+set_type:expansion+or+set_type:commander+or+set_type:funny+or+set_type:masters+or+set_type:memorabilia+or+set_type:draft_innovation&include_extras=true&include_variations=true&order=released";
		Integer page = 1;
		List<CardWrapper> cards = new ArrayList<>();

		RestTemplate template = new RestTemplate();
		ResponseEntity<Search> response = template.exchange(url, HttpMethod.GET, null,
				new ParameterizedTypeReference<Search>() {
				});
		Search search = response.getBody();
		cards.addAll(search.getData());

		// Paginate trough all pages
		while (search.isHas_more() && !page.equals(20)) {
			url = MessageFormat.format(
					"https://api.scryfall.com/cards/search?q=set_type:token+or+set_type:core+or+set_type:expansion+or+set_type:commander+or+set_type:funny+or+set_type:masters+or+set_type:memorabilia+or+set_type:draft_innovation&include_extras=true&include_variations=true&order=released&page={0}",
					page.toString());
			response = template.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<Search>() {
			});
			search = response.getBody();
			cards.addAll(search.getData());

			page++;
		}

		// TODO Get the data on the last page

		cardDao.saveAll(cards);

		log.info("Cards fetched from Scryfall API " + dateFormat.format(new Date()));
	}

	// Fetch set data
	@Scheduled(cron = "0 0 2 ? * *")
	public void getAllSets() {
		String url = "https://api.scryfall.com/sets/";
		List<Set> sets = new ArrayList<>();

		RestTemplate template = new RestTemplate();
		ResponseEntity<SetSearch> response = template.exchange(url, HttpMethod.GET, null,
				new ParameterizedTypeReference<SetSearch>() {
				});
		SetSearch search = response.getBody();
		sets.addAll(search.getData());
		setDao.saveAll(sets);

		log.info("Sets fetched from Scryfall API " + dateFormat.format(new Date()));
	}

	// Update collections when there are new cards
	@Scheduled(cron = "0 0 1 ? * *")
	// @Scheduled(cron = "0/30 * * * * *")
	public void updateCollectionCards() {
		// Use the user "update" to find all new cards by comparing
		UserWrapper user = userDao.findUser("update@update.com");
		List<CardWrapper> dbCards = cardDao.findAll(); // Get all cards fetched to database
		Collection collectionCards = collectionDao.findByFinderID(user.getUsername() + user.getEmail());
		Boolean isInCollection = false;

		List<CollectionCardWrapper> newCards = new ArrayList<>();

		for (CardWrapper card : dbCards) {
			for (CollectionCardWrapper card2 : collectionCards.getCards()) {
				if (card.getId().equals(card2.getId())) { // Check if card is in collections already and mark true if
															// is.
					isInCollection = true;
					break;
				}
			}

			// If not in collections, add to new cards list
			if (!isInCollection) {
				newCards.add(new CollectionCardWrapper(card.getId(), card.getName(), card.getSet(), false,
						card.getPrices()));
			}
			isInCollection = false;
		}

		List<Collection> collections = collectionDao.findAll();

		// Go through all collections and add all new cards
		for (Collection collection : collections) {
			List<CollectionCardWrapper> userCards = collection.getCards();
			userCards.addAll(newCards);
			collection.setCards(userCards);
			collectionDao.save(collection);
		}

		log.info("Finished updating collections.");
	}

}
