const {Card, CardContainer} = require('./Card')
const express = require('express');
const mysql = require('mysql');
const axios = require('axios');
const schedule = require('node-schedule');
const { json } = require('stream/consumers');

var con = mysql.createConnection({
    host: "localhost",
    user: "root", 
    password: "", 
    database: "collections"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

let cards = [];
let api;
let apidata;

// ALL CARDS: https://c2.scryfall.com/file/scryfall-bulk/default-cards/default-cards-20220926090845.json

// Get the API data
const getApi = () => {
    return new Promise(resolve => {
        api = axios.get('https://api.scryfall.com/cards/search?q=e%3Admu')
        //console.log(api)
        resolve(api);
    });
};

async function getCards(){
    apidata = await getApi();

    //Arrange the API data to array
    for (const [key, value] of Object.entries(apidata.data.data)) {  
        cards.push([value.id, value.name, value.collector_number, value.rarity, value.image_uris.small, value.prices.eur, false, value.set_name])
    }
    
    let sql = "REPLACE INTO allcards (id, name, collectionnumber, rarity, imageuri, price, isincollection, setcode) VALUES ?";

    // Add the cards to the database
    con.query(sql, [cards], function (err, result) {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
    });

}

getCards();

// Update the database every 10 minutes
// TODO when no longer needed -> minute to every 12 hours or so
var scheduler = schedule.scheduleJob('*/10 * * * *', async function(){
    const getApi = () => {
        return new Promise(resolve => {
            api = axios.get('https://api.scryfall.com/cards/search?q=e%3Admu')
            resolve(api);
        });
    };
    apidata = await getApi();

    getCards();
});

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.set('view engine', 'ejs');

// -------------------------- endpoints ---------------------------------
//
// endpoint: http://localhost:3001/all-cards
app.get('/my-collection', (req, res) => {
    let allcards = [];
    
    // Get the cards from the database and render visually
    con.query("SELECT * FROM allcards ORDER BY collectionnumber", function (err, result, fields) {
        if (err) throw err;
        // Store the data in an array
        for (const [key, value] of Object.entries(result)) {  
            allcards.push([value.name, value.collectionnumber, value.rarity, value.imageuri, value.price, value.isincollection, value.setcode, value.id])
        }
        //console.log(allcards);
        res.render('allcards.ejs', {cards: allcards });
    });
});

app.post('/my-collection', async (req, res) => {
    let cardscollected = []
    try {
        for (const [key, value] of Object.entries(req.body)) {  
            cardscollected.push([value])
        }
        //const body = await JSON.stringify(req.body.card)    // JSON.stringify needed here
        //console.log("Body: " + body)
        console.log(cardscollected)
    }
    catch {
        console.log("Fail")
    }
})

// TODO endpoint: http://localhost:3001/my-collection
// TODO endpoint: http://localhost:3001/my-collection/:set

//
// -------------------------- /endpoints ---------------------------------


const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})