const express = require('express')
const axios = require('axios');
const app = express()

app.set('view engine', 'ejs');

// TODO card database
// TODO my cards database ---> same as above, but with number owned prop 

// endpoint: http://localhost:3001/all-cards
app.get('/all-cards', async (req, res, body) => {
    let cards = [];
    let api;

    // Get the API data
    const getApi = () => {
        return new Promise(resolve => {
            api = axios.get('https://api.scryfall.com/cards/search?q=e%3Admu')
            resolve(api);
        });
    };

apidata = await getApi();

// Sort the data
apidata.data.data.sort(function(a, b) { 
    return a.collector_number - b.collector_number
});

// Arrange the API data to array
for (const [key, value] of Object.entries(apidata.data.data)) {  
    cards.push([value.name, value.collector_number, value.rarity, value.image_uris.small])
}


console.log(cards)

res.render('allcards.ejs', {cards: cards });
});

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})