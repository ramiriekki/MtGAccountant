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
let apidata;

// multiple sets --> https://api.scryfall.com/cards/search?include_extras=true&include_variations=true&order=set&q=(set%3Aaer+OR+set%3Admu)
// whole set --> https://api.scryfall.com/cards/search?include_extras=true&include_variations=true&order=set&q=e%3Admu
// Get the API data
const getApi = () => {
    return new Promise(resolve => {
        // api = axios.get('https://api.scryfall.com/cards/search?q=e%3Admu')
        // resolve(api);
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

async function getCards(){
    let cards = [];
    
    apidata = await getApi();
    //console.log(ID of card in pos 1: apidata[0].data.data[1].id)
    
    //Arrange the API data to array from all pages
    let p = 0
    console.log("Lenght: " +  Object.keys(apidata).length)
    do {
        for (const [key, value] of Object.entries(apidata[p].data.data)) {  
            cards.push([value.id, value.name, value.collector_number, value.rarity, value.image_uris.small, value.prices.eur, value.set_name, value.oracle_text, value.flavor_text, value.image_uris.normal])
            //console.log("p: " + p)
        }
        p++
    } while(p < Object.keys(apidata).length)
    
    // TODO update price
    let sql = "INSERT INTO allcards (id, name, collectionnumber, rarity, imageuri, price, setcode, oracletext, flavortext, imageuri_normal) VALUES ? ON DUPLICATE KEY UPDATE isincollection = IF(isincollection = 1, 1, 0)"

    // Add the cards to the database
    con.query(sql, [cards], function (err, result) {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
    });
}

getCards();

// Update the database every 10 minutes
// TODO when no longer needed -> minute to every 12 hours or so
// TODO update to go through all pages
var scheduler = schedule.scheduleJob('*/10 * * * *', async function(){
    const getApi = () => {
        return new Promise(resolve => {
            // api = axios.get('https://api.scryfall.com/cards/search?q=e%3Admu')
            // resolve(api);
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
    apidata = await getApi();

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

// TODO endpoint: http://localhost:3001/my-collection/:set
// TODO endpoint: http://localhost:3001/my-collection/:set/:card

//
// -------------------------- /endpoints ---------------------------------


const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})