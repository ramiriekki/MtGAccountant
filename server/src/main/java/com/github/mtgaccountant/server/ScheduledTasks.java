package com.github.mtgaccountant.server;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import com.github.mtgaccountant.server.models.Search;

@Component
public class ScheduledTasks {
    private static final SimpleDateFormat dateFormat = new SimpleDateFormat("MM/dd/yyyy HH:mm:ss");

	@Scheduled(cron = "*/30 * * * * *")
	public void getAllCards() {
		System.out.println("Cards fetched from Scryfall API " + dateFormat.format(new Date()));

		// reference: https://github.com/ricardoveramedina/single-cards/blob/master/src/main/java/com/pueblolavanda/singlecards/client/ApiScryfall.java
		String url = "https://api.scryfall.com/cards/search?q=set:aer";
		RestTemplate template = new RestTemplate();
		ResponseEntity<Search> rateResponse = template.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<Search>(){});
		Search cards = rateResponse.getBody();
		
		System.out.println(cards);
	}
}
