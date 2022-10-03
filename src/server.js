const express = require('express');
const mysql = require('mysql');
const axios = require('axios');
const schedule = require('node-schedule');
const { resolve } = require('path');

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

let api;
let cardData;

// multiple sets --> https://api.scryfall.com/cards/search?include_extras=true&include_variations=true&order=set&q=(set%3Aaer+OR+set%3Admu)
// whole set --> https://api.scryfall.com/cards/search?include_extras=true&include_variations=true&order=set&q=e%3Admu
// Get the API data
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
                    // console.log(repo.data.has_more)
                    // console.log(results.length)
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

const getSetAPI = () => {
    return new Promise(resolve => {
        let results
        async function getData(){
            async function getAllPages(){
                const repo = await axios.get(`https://api.scryfall.com/sets`);
                results = repo
                return results
            }
            result = await getAllPages()
            return result
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

    //console.log(ID of card in pos 1: cardData[0].data.data[1].id)
    //console.log(setData.data.data)

    //Arrange the card API data to array from all pages
    let p = 0
    console.log("Lenght: " +  Object.keys(cardData).length)
    do {
        for (const [key, value] of Object.entries(cardData[p].data.data)) {  
            cards.push([value.id, value.name, value.collector_number, value.rarity, value.image_uris.small, value.prices.eur, value.set_name, value.oracle_text, value.flavor_text, value.image_uris.normal, value.set])
            //console.log("p: " + p)
        }
        p++
    } while(p < Object.keys(cardData).length)

    for (const [key, value] of Object.entries(setData.data.data)) {  
        sets.push([value.id, value.code, value.name, value.released_at, value.set_type, value.card_count, value.icon_svg_uri])
        //console.log("p: " + p)
    }
    
    // TODO update price
    let sql = "INSERT INTO allcards (id, name, collectionnumber, rarity, imageuri, price, setcode, oracletext, flavortext, imageuri_normal, set_code) VALUES ? ON DUPLICATE KEY UPDATE isincollection = IF(isincollection = 1, 1, 0)"

    // Add the cards to the database
    con.query(sql, [cards], function (err, result) {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
    });

    let sql2 = "REPLACE INTO sets (set_id, code, name, release_date, type, card_count, icon_uri) VALUES ?"

    con.query(sql2, [sets], function (err, result) {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
    });
}

getCards();

// Update the database every 10 minutes
// TODO when no longer needed -> minute to every 12 hours or so
// TODO update to go through all pages
var scheduler = schedule.scheduleJob('*/10 * * * *', async function(){
    const getCardAPI = () => {
        return new Promise(resolve => {
            async function getData(){
                // If there is multiple pages go through one page then alter url and repeat
                // As long as the has_more value is true or on the last page when there is still data
                async function getAllPages(){
                    let repo = null, page = 1, results = [];
                    do {
                        repo = await axios.get(`https://api.scryfall.com/cards/search?format=json&include_extras=true&include_multilingual=false&include_variations=true&order=set&page=${page++}&q=(set%3Aaer+or+set%3Admu)`);
                        results = results.concat(repo)
                        // console.log(repo.data.has_more)
                        // console.log(results.length)
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
    cardData = await getCardAPI();

    getCards();
});

const app = express();

// --------- middleware ---------
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(express.static('public'))
// --------- /middleware --------

app.set('view engine', 'ejs');

// -------------------------- endpoints ---------------------------------
// TODO change this to set view --> all sets displayed with number of cards and progress bar
// endpoint: http://localhost:3001/all-cards
app.get('/my-collection/', (req, res) => {
    let cards = [];
    
    // Get the cards from the database and render visually
    con.query("SELECT * FROM allcards ORDER BY name", function (err, result, fields) {
        if (err) throw err;
        // Store the data in an array
        for (const [key, value] of Object.entries(result)) {  
            cards.push([value.name, value.collectionnumber, value.rarity, value.imageuri, value.price, value.isincollection, value.setcode, value.id])
        }
        //console.log(allcards);
        res.render('allcards.ejs', {cards: cards });
    });
});

app.post('/my-collection/', async (req, res) => {
    let cardscollected
    //console.log(JSON.stringify(req.body))
    
    try { 
        // BUG if there is only one card, this wont work
        // if only one card is received -> cardscollected not an array
        // if multiple -> cardscollected array
        for (const [key, value] of Object.entries(req.body)) {  
            cardscollected = value
        }
        
        // Go through acquired array and update the isincollection value in the database
        for (const [key, value] of Object.entries(cardscollected)) {  
            let sql = `UPDATE allcards SET isincollection = '1' WHERE id = "${value}"`
            con.query(sql)
            //console.log(value)
        }
        //console.log("Body: " + body)
        console.log("collected" + cardscollected)
        res.redirect('/my-collection');
    }
    catch {
        console.log("Fail")
    }
})

// endpoint: http://localhost:3001/all-cards/:cardid
app.get('/my-collection/:card/', (req, res) => {
    const cardid = String(req.params.card)
    let tempcard
    let card = []
    
    con.query(`SELECT * FROM allcards WHERE id = "${cardid}"`, function (err, result) {
        if (err) throw err;

        tempcard = result

        card.push(tempcard[0].id)
        card.push(tempcard[0].name)
        card.push(tempcard[0].collectionnumber)
        card.push(tempcard[0].rarity)
        card.push(tempcard[0].price)
        card.push(tempcard[0].setcode)
        card.push(tempcard[0].flavortext)
        card.push(tempcard[0].imageuri_normal)
        
        console.log(card);
        
        res.render('singlecard.ejs', {card: card});
    });
})

// TODO progress bar for each set item
app.get('/sets/', (reg, res) => {
    let sets = [];

    // Get the cards from the database and render visually
    con.query("SELECT * FROM sets WHERE name = 'Dominaria United' OR name = 'Aether Revolt'", function (err, result, fields) {
        if (err) throw err;
        //Store the data in an array
        for (const [key, value] of Object.entries(result)) {  
            sets.push([value.id, value.set_id, value.code, value.name, value.released_date, value.type, value.card_count, value.icon_uri])
        }
        //console.log(allcards);
        res.render('sets.ejs', {sets: sets });
    });
})

// endpoint: http://localhost:3001/all-cards/:cardid
app.get('/sets/:set/', (req, res) => {
    const code = String(req.params.set)
    let cards = []
    
    // Select all cards that have the same set_code as given param in request
    con.query(`SELECT * FROM allcards WHERE set_code = "${code}"`, function (err, result) {
        let set = []
        let cardsCollected = 0

        if (err) throw err;
        //console.log(result)

        for (const [key, value] of Object.entries(result)) {  
            cards.push([value.name, value.collectionnumber, value.rarity, value.imageuri, value.price, value.isincollection, value.setcode, value.id])
            if(value.isincollection == 1){
                cardsCollected++
            }
            //console.log(value.isincollection)
        }

        console.log("Collected cards: " + cardsCollected)
        
        // Get the set data
        con.query(`SELECT * FROM sets WHERE code = "${code}"`, function (err, result) {
            if (err) throw err;
            tempset = result

            set.push(tempset[0].set_id)
            set.push(tempset[0].code)
            set.push(tempset[0].name)
            set.push(tempset[0].release_date)
            set.push(tempset[0].type)
            set.push(tempset[0].card_count)
            set.push(tempset[0].icon_uri)
            
            //console.log(set);
            
            res.render('setcards.ejs', {cards: cards, set: set, cardsCollected});
        });
    });
})

app.post('/sets/:set', async (req, res) => {
    let cardscollected = []
    let set = req.body.set
    console.log(set)
    
    try { 
        // BUG if there is only one card, this wont work
        // if only one card is received -> cardscollected not an array
        // if multiple -> cardscollected array
        for (const [key, value] of Object.entries(req.body.card)) {  
            cardscollected.push(value)
        }
        
        console.log(cardscollected)
        // Go through acquired array and update the isincollection value in the database
        for (const [key, value] of Object.entries(cardscollected)) {  
            let sql = `UPDATE allcards SET isincollection = '1' WHERE id = "${value}"`
            con.query(sql)
        }
        //console.log("Body: " + body)
        //console.log("collected" + cardscollected)
        res.redirect(`/sets/${set}`);
    }
    catch {
        console.log("Fail")
    }
})
// TODO endpoint: http://localhost:3001/my-collection/:set/:card

//
// -------------------------- /endpoints ---------------------------------


const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})