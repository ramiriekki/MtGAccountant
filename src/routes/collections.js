const express = require('express');
const init = require("../init");
const con = init.getCon()

const router = express.Router(); 

router.use(express.json())
router.use(express.urlencoded({extended : true}))
router.use('/public', express.static('public')); // access css files

// endpoint: http://localhost:3001/my-collection
router.get('/my-collection/', async (req, res) => {
    // Get the cards from the database
    let cards = await promiseQuery(`SELECT * FROM allcards ORDER BY name`);

    let page
    // If requested url is the my-collection root set page to 1
    if(req.url == "/my-collection/" || req.url == "/my-collection"){page = 1}else{page = parseInt(req.query.page)}
    const limit = 51    // How many cards are displayed on page

    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    const results = {}

    // Check if current page has next page by comparing the 
    // lenght of cards object to pages last cards index
    if (endIndex < Object.keys(cards).length) {
        results.next = {
            page: page + 1,
            limit: limit
        }
    } else {
        results.next = {
            page: page,
            limit: limit
        }
    }
    
    // Check if current page has previous page by comparing the 
    // lenght of cards object to pages last cards index
    if (startIndex > 0) {
        results.previous = {
            page: page - 1,
            limit: limit,
        }
    } else {
        results.previous = {
            page: page,
            limit: limit,
        }
    }

    // Convert cards from object to array of values
    results.results = Object.values(cards).slice(startIndex, endIndex)
    // console.log(results.results.length)
    // console.log(typeof(results.previous))
    res.render('allcards.ejs', {cards: results.results, prev: results.previous.page, next: results.next.page, page, endIndex, limit, length: results.results.length});
});

router.post('/my-collection/', async (req, res) => {
    let cardscollected
    //console.log(req.body)
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
        }

        res.redirect('/my-collection?page=1');
    }
    catch {
        console.log("Fail")
    }
})

// endpoint: http://localhost:3001/all-cards/:cardid
router.get('/my-collection/:card/', (req, res) => {
    const cardid = String(req.params.card)
    let tempcard
    let card = []
    
    // TODO create a card class
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
        
        res.render('singlecard.ejs', {card: card});
    });
})

// TODO progress bar for each set item -> needs new column in sets db table (number_of_cards_collected)
router.get('/sets/', (reg, res) => {
    let sets = [];

    // Get the cards from the database and render visually
    con.query("SELECT * FROM sets WHERE name = 'Dominaria United' OR name = 'Aether Revolt'", function (err, result, fields) {
        if (err) throw err;
        //Store the data in an array
        for (const [key, value] of Object.entries(result)) {  
            sets.push([value.id, value.set_id, value.code, value.name, value.released_date, value.type, value.card_count, value.icon_uri])
        }

        res.render('sets.ejs', {sets: sets });
    });
})

// endpoint: http://localhost:3001/all-cards/:cardid
router.get('/sets/:set/', (req, res) => {
    const code = String(req.params.set)
    let cards = []
    
    // Select all cards that have the same set_code as given param in request
    con.query(`SELECT * FROM allcards WHERE set_code = "${code}"`, function (err, result) {
        let set = []
        let cardsCollected = 0

        if (err) throw err;

        // Progress bar values
        for (const [key, value] of Object.entries(result)) {  
            cards.push([value.name, value.collectionnumber, value.rarity, value.imageuri, value.price, value.isincollection, value.setcode, value.id])
            if(value.isincollection == 1){
                cardsCollected++
            }
        }
        
        // Get the set data
        // TODO set class
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
            
            res.render('setcards.ejs', {cards: cards, set: set, cardsCollected});
        });
    });
})

router.post('/sets/:set', async (req, res) => {
    let cardscollected = []
    let set = req.body.set
    
    try { 
        // BUG if there is only one card, this wont work
        // if only one card is received -> cardscollected not an array
        // if multiple -> cardscollected array
        for (const [key, value] of Object.entries(req.body.card)) {  
            cardscollected.push(value)
        }

        // Go through acquired array and update the isincollection value in the database
        for (const [key, value] of Object.entries(cardscollected)) {  
            let sql = `UPDATE allcards SET isincollection = '1' WHERE id = "${value}"`
            con.query(sql)
        }

        res.redirect(`/sets/${set}`);
    }
    catch {
        console.log("Fail")
    }
})

//
// -------------------------- /endpoints ---------------------------------

// For preparing paginating /my-collection/. 
function promiseQuery(query) {
    return new Promise((resolve, reject) => {
        let cards = []
        con.query(query, (err, results) => {
            if (err) {
                return reject(err);
            }
            for (const [key, value] of Object.entries(results)) {  
                cards.push([value.name, value.collectionnumber, value.rarity, value.imageuri, value.price, value.isincollection, value.setcode, value.id])
            }
            resolve(cards);
        })
    })
}

module.exports = router