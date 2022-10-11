const mysql = require('mysql');
const axios = require('axios');

// Database connetion
var con = mysql.createConnection({
    host: "localhost",
    user: "root",  
    password: process.env.ADMIN_PASSWORD, 
    database: "collections"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

// Returns the connection for later use in api endpoints
function getCon(){
    return con;
}

let api;
let cardData;

// multiple sets --> https://api.scryfall.com/cards/search?include_extras=true&include_variations=true&order=set&q=(set%3Aaer+OR+set%3Admu)
// whole set --> https://api.scryfall.com/cards/search?include_extras=true&include_variations=true&order=set&q=e%3Admu
// Get the card API data
const getCardAPI = () => {
    return new Promise(resolve => {
        async function getData(){
            // If there is multiple pages go through one page then alter url and repeat
            // As long as the has_more value is true or on the last page when there is still data
            async function getAllPages(){
                let repo = null, page = 1, results = [];
                do {
                    repo = await axios.get(`https://api.scryfall.com/cards/search?format=json&include_extras=true&include_multilingual=false&include_variations=true&order=set&page=${page++}&q=(set%3Aaer+or+set%3Admu)&unique=cards`);
                    results = results.concat(repo)
                    console.log(repo.data.has_more)
                    console.log(results.length)
                } while(repo.data.has_more == true | page < results.lenght)
                page = 0
                return results
            }
            result = await getAllPages()
            return result
        }
        api = getData()
        resolve(api)
    });

};

// Get the set data
const getSetAPI = () => {
    return new Promise(resolve => {
        let results
        async function getData(){
            async function getAllPages(){
                const repo = await axios.get(`https://api.scryfall.com/sets`);
                results = repo
                return results
            }
            results = await getAllPages()
            return results
        }
        api = getData()
        resolve(api)
    });

};

async function getCards(){
    let cards = [];
    let sets = [];
    
    setData = await getSetAPI()
    cardData = await getCardAPI()

    // Page variable
    let p = 0

    // Arrange the card API data to array from all pages. Increase p after getting all the data on one page.
    do {
        for (const [key, value] of Object.entries(cardData[p].data.data)) {  
            cards.push([value.id, value.name, value.collector_number, value.rarity, value.image_uris.border_crop, value.prices.eur, value.set_name, value.oracle_text, value.flavor_text, value.image_uris.normal, value.set])
        }
        p++
    } while(p < Object.keys(cardData).length)

    // Arrange the set data to an array
    for (const [key, value] of Object.entries(setData.data.data)) {  
        sets.push([value.id, value.code, value.name, value.released_at, value.set_type, value.card_count, value.icon_svg_uri])
    }
    
    // TODO update price
    let sql = "INSERT INTO allcards (id, name, collectionnumber, rarity, imageuri, price, setcode, oracletext, flavortext, imageuri_normal, set_code) VALUES ? ON DUPLICATE KEY UPDATE isincollection = IF(isincollection = 1, 1, 0)"

    // Add the cards to the database
    con.query(sql, [cards], function (err, result) {
        if (err) throw err;
        //console.log("Number of records inserted: " + result.affectedRows);
    });

    let sql2 = "REPLACE INTO sets (set_id, code, name, release_date, type, card_count, icon_uri) VALUES ?"

    con.query(sql2, [sets], function (err, result) {
        if (err) throw err;
        //console.log("Number of records inserted: " + result.affectedRows);
    });
}

module.exports = { getCards, getCon };
