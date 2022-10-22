const express = require('express');
const init = require("../init");
const con = init.getCon()
const requireLogin = (req, res, next) => { // middleware for requiring authentication on requests
    if (req.session.user) {
        next();
    } else {
        res.redirect('/home/login');
    }
};

const router = express.Router(); 

router.use(express.json())
router.use(express.urlencoded({extended : true}))
router.use('/public', express.static('public')); // access css files


// endpoint: http://localhost:3001/my-collection
router.get('/my-collection/', requireLogin, async (req, res) => {
    //console.log(req.session.user)
    // Get the cards from the database
    let cards = await promiseQuery(`SELECT * FROM cards WHERE username = "${req.session.user}" ORDER BY card_name`); // TODO if undefined

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
        for (const [key, value] of Object.entries(req.body)) {  
            cardscollected = value
        }
        
        //console.log(typeof(cardscollected))

        if(typeof(cardscollected) == "string"){
            let sql = `UPDATE cards SET is_in_collection = '1' WHERE card_id = "${cardscollected}" and username = "${req.session.user}"`
            con.query(sql)
        } else {
            // Go through acquired array and update the isincollection value in the database
            for (const [key, value] of Object.entries(cardscollected)) {  
                let sql2 = `UPDATE cards SET is_in_collection = '1' WHERE card_id = "${value}" and username = "${req.session.user}"`
                con.query(sql2)
            }
        }

        res.redirect('/collections/my-collection?page=1');
    }
    catch {
        console.log("Fail")
    }
})

// endpoint: http://localhost:3001/all-cards/:cardid
router.get('/my-collection/:card/', requireLogin, (req, res) => {
    // console.log(req.session.user)
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

router.get('/sets/', requireLogin, (reg, res) => {
    let sets = [];

    // Get the cards from the database and render visually
    // con.query("SELECT * FROM sets WHERE name = 'Dominaria United' OR name = 'Aether Revolt'", function (err, result, fields) {
    //     if (err) throw err;
    //     //Store the data in an array
    //     for (const [key, value] of Object.entries(result)) {  
    //         sets.push([value.id, value.set_id, value.code, value.name, value.released_date, value.type, value.card_count, value.icon_uri])
    //     }

    //     res.render('sets.ejs', {sets: sets });
    // });

    con.query(" select a.*, (select count(*) from cards x where (x.set_code = a.code and x.username = 'testaaja' and x.is_in_collection = '1')) as collected_amount from sets a where name = 'Dominaria United' OR name = 'Aether Revolt'", function (err, result, fields) {
        if (err) throw err;
        //Store the data in an array
        for (const [key, value] of Object.entries(result)) {  
            sets.push([value.id, value.set_id, value.code, value.name, value.released_date, value.type, value.card_count, value.icon_uri, value.collected_amount])
            //console.log("Cards collected from set: " + value.collected_amount)
        }

        res.render('sets.ejs', {sets: sets });
    });
})

// endpoint: http://localhost:3001/all-cards/:cardid
router.get('/sets/:set/', requireLogin, (req, res) => {
    const code = String(req.params.set)
    let cards = []
    
    // Select all cards that have the same set_code as given param in request
    con.query(`SELECT * FROM cards WHERE set_code = "${code}" and username = "${req.session.user}" ORDER BY card_name`, function (err, result) {
        let set = []
        let cardsCollected = 0

        if (err) throw err;

        // Progress bar values
        for (const [key, value] of Object.entries(result)) {  
            cards.push([value.card_name, value.collection_number, value.rarity, value.imageuri_small, value.price, value.is_in_collection, value.set_name, value.card_id])
            if(value.is_in_collection == 1){
                cardsCollected++
            }
        }

        // console.log("cards array: " + cards.length)
        
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
        //console.log(typeof(req.body.card))

        if (typeof(req.body.card) == "string"){
            let sql = `UPDATE allcards SET isincollection = '1' WHERE id = "${req.body.card}"`
            con.query(sql)
        } else {
            for (const [key, value] of Object.entries(req.body.card)) {  
                cardscollected.push(value)
            }

            //console.log(cardscollected)
            // Go through acquired array and update the isincollection value in the database
            for (const [key, value] of Object.entries(cardscollected)) {  
                let sql2 = `UPDATE allcards SET isincollection = '1' WHERE id = "${value}"`
                con.query(sql2)
            }
        }
        res.redirect(`/collections/sets/${set}`);
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
                cards.push([value.card_name, value.collection_number, value.rarity, value.imageuri_small, value.price, value.is_in_collection, value.set_name, value.card_id])
            }
            resolve(cards);
        })
    })
}

router.get('/search/', (req, res) => {
    //TODO form handling and results view. Results view should have some type of sorting system
    res.render('search.ejs')
})

module.exports = router