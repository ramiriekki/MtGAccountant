const express = require('express');
const axios = require('axios');

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(express.static('public'))

let api;
let apidata;

// Get the API data
const getApi = () => {
    //TODO get bulk-data first -> download_uri to api variable
    return new Promise(resolve => {
        api = axios.get('https://data.scryfall.io/default-cards/default-cards-20221001090531.json')
        console.log(api)
        resolve(api);
    });
};

async function getCards(){
    let cards = [];
    apidata = await getApi();

    console.log(apidata)
    
    //Arrange the API data to array
    for (const [key, value] of Object.entries(apidata.data)) {  
        cards.push([value.id, value.name, value.collector_number, value.rarity, value.image_uris, value.prices, value.set_name, value.oracle_text, value.flavor_text, value.image_uris])
    }

    console.log("Numer of objects collected: " + cards.length)
    return cards
}

async function test(){
    cards = await getCards();
    console.log(cards)
}
test()



const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})