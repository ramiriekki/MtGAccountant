package com.github.mtgaccountant.server;

import java.text.MessageFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import com.github.mtgaccountant.server.dao.CardDao;
import com.github.mtgaccountant.server.models.Search;
import com.github.mtgaccountant.server.wrapper.CardWrapper;

@Component
public class ScheduledTasks {

	@Autowired
	CardDao cardDao;

    private static final SimpleDateFormat dateFormat = new SimpleDateFormat("MM/dd/yyyy HH:mm:ss");

	// TODO: Api data paginated -> go through all the pages.
	@Scheduled(cron = "*/660 * * * * *")
	public void getAllCards() {
		System.out.println("Cards fetched from Scryfall API " + dateFormat.format(new Date()));

		// reference: https://github.com/ricardoveramedina/single-cards/blob/master/src/main/java/com/pueblolavanda/singlecards/client/ApiScryfall.java
		// All cards: https://api.scryfall.com/cards/search?q=color:blue+or+color:red+or+color:green+or+color:white+or+color:black+or+color:colorless
		String url = "https://api.scryfall.com/cards/search?q=color:blue+or+color:red+or+color:green+or+color:white+or+color:black+or+color:colorless";
		Integer page = 1;
		List<CardWrapper> cards = new ArrayList<>();
		
		RestTemplate template = new RestTemplate();
		ResponseEntity<Search> response = template.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<Search>(){});
		Search search = response.getBody();
		cards.addAll(search.getData());

		//System.out.println(search.getData());
		
		// while(search.isHas_more()){
		// 	url = MessageFormat.format("https://api.scryfall.com/cards/search?q=color:blue+or+color:red+or+color:green+or+color:white+or+color:black+or+color:colorless&page={0}", page.toString()) ;
		// 	response = template.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<Search>(){});
		// 	search = response.getBody();
		// 	cards.addAll(search.getData());
			
		// 	System.out.println(page);
		// 	page++;
		// }

		//System.out.println(cards);

		cardDao.saveAll(cards);
	}
}
