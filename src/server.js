const express = require('express');
const mysql = require('mysql');
const axios = require('axios');
const app = express();
var schedule = require('node-schedule');

app.set('view engine', 'ejs');

var con = mysql.createConnection({
    host: "localhost",
    user: "",
    password: "",
    database: ""
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

let cards = [];
let api;
let apidata;

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
    //console.log(apidata.data.data)

    // Sort the data
    // apidata.data.data.sort(function(a, b) { 
    //     return a.collector_number - b.collector_number
    // });

    let sql = "REPLACE INTO allcards (id, name, collectionnumber, rarity, imageuri) VALUES ?";

    //Arrange the API data to array
    for (const [key, value] of Object.entries(apidata.data.data)) {  
        cards.push([value.id, value.name, value.collector_number, value.rarity, value.image_uris.small])
    }

    con.query(sql, [cards], function (err, result) {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
    });

}

getCards();

// Update the database every minute
// TODO when no longer needed -> minute to every 12 hours or so
var scheduler = schedule.scheduleJob('*/1 * * * *', async function(){
    const getApi = () => {
        return new Promise(resolve => {
            api = axios.get('https://api.scryfall.com/cards/search?q=e%3Admu')
            resolve(api);
        });
    };
    apidata = await getApi();

    getCards();
});

// -------------------------- endpoints ---------------------------------
//
// endpoint: http://localhost:3001/all-cards
app.get('/all-cards', async (req, res, body) => {
    let allcards = [];
    con.query("SELECT name, collectionnumber, rarity, imageuri FROM allcards", function (err, result, fields) {
        if (err) throw err;
        for (const [key, value] of Object.entries(result)) {  
            allcards.push([value.name, value.collectionnumber, value.rarity, value.imageuri])
        }
        //console.log(allcards[1]);
        res.render('allcards.ejs', {cards: allcards });
    });
});
//
// -------------------------- /endpoints ---------------------------------


const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})