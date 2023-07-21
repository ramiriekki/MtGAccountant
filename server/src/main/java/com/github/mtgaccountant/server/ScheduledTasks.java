package com.github.mtgaccountant.server;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import com.github.mtgaccountant.server.constants.MtgAccountantConstants;
import com.github.mtgaccountant.server.dao.CardDao;
import com.github.mtgaccountant.server.dao.CollectionDao;
import com.github.mtgaccountant.server.dao.SetDao;
import com.github.mtgaccountant.server.dao.UserDao;
import com.github.mtgaccountant.server.models.Collection;
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
		int page = 1;
		List<CardWrapper> cards = new ArrayList<>();
		RestTemplate template = new RestTemplate();

		ResponseEntity<List<CardWrapper>> response;
		do {
			response = template.exchange(MtgAccountantConstants.SCHEDULED_BASE_URL, HttpMethod.GET, null, new ParameterizedTypeReference<List<CardWrapper>>() {}, page);
			cards.addAll(response.getBody());
			page++;
		} while (response.getBody() != null && !response.getBody().isEmpty());

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

		List<CollectionCardWrapper> newCards = dbCards.stream()
			.filter(card -> !collectionCards.getCards().stream().anyMatch(card2 -> card.getId().equals(card2.getId())))
			.map(card -> new CollectionCardWrapper(card.getId(), card.getName(), card.getSet(), false, card.getPrices()))
			.collect(Collectors.toList());

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
