const { json } = require('express');
const express = require('express');
const db = require("../db");
const con = db.getCon()

const router = express.Router(); 

router.use(express.json())
router.use(express.urlencoded({extended : true}))
router.use('/public', express.static('public')); // access css files

router.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});

// endpoint: http://localhost:3001/collections/my-collection
router.get('/my-collection/', async (req, res) => {
    console.log(req.session)
    console.log(req.session.username)

    console.log("Got request!")
    // Get the cards from the database
    let cards = await promiseQuery(`SELECT * FROM cards WHERE username = "${req.session.username}" ORDER BY card_name`); // TODO if undefined

    let results = []
    const newKeys = { 0: "name", 1: "collection_number", 2: "rarity", 3: "imageuri_small", 4: "price", 5: "is_in_collection", 6: "set_name", 7: "card_id", 8: "requested_amount"}; // rename keys for angular

    //console.log(cards)
    for (const [key, value] of Object.entries(cards)) {  
        const renamedObj = renameKeys(value, newKeys);
        results.push((Object.assign({}, renamedObj)))
    }

    res.json(results);
});

router.post('/my-collection/', async (req, res) => {
    console.log(req.body)

    //res.json(results);
});

router.get('/my-collection/:card/', (req, res) => {
    console.log(req.session)

    // console.log(req.session.user)
    const cardid = String(req.params.card)
    let tempcard
    let card = {}
    
    // TODO create a card class
    con.query(`SELECT * FROM allcards WHERE id = "${cardid}"`, function (err, result) {
        if (err) throw err;

        tempcard = result

        card =
            {
                id: tempcard[0].id,
                name: tempcard[0].name,
                collection_number: tempcard[0].collectionnumber,
                rarity: tempcard[0].rarity,
                set_name: tempcard[0].setcode,
                flavor_text: tempcard[0].flavortext,
                image_uri: tempcard[0].imageuri_normal,
                price: tempcard[0].price
            }

        res.json(card);
    });
})

router.get('/sets/', (req, res) => {
    console.log(req.session)
    console.log(req.session.username)
    let sets = [];

    con.query("select * from sets where type = 'expansion' OR type = 'core'", function (err, result, fields) {
        if (err) throw err;
        //Store the data in an array
        for (const [key, value] of Object.entries(result)) {  
            sets.push({code: value.code, name: value.name, released_date: value.released_date, type: value.type, card_count: value.card_count, icon_uri: value.icon_uri})
            //console.log("Cards collected from set: " + value.collected_amount)
        }

        res.json(sets);
    });
})

router.get('/sets/:set/', (req, res) => {
    console.log(req.session)

    const code = String(req.params.set)
    let data = []
    let cards = []
    
    // Select all cards that have the same set_code as given param in request
    con.query(`SELECT * FROM allcards WHERE set_code = "${code}" ORDER BY name`, function (err, result) {
        let set = []
        let cardsCollected = 0

        if (err) throw err;

        // Progress bar values
        for (const [key, value] of Object.entries(result)) {  
            cards.push({ 
                        id: value.id,
                        name: value.name,
                        collection_number: value.collectionnumber, 
                        rarity: value.rarity, 
                        set_name: value.setcode,
                        flavor_text: value.flavortext,
                        image_uri: value.imageuri_normal,
                        price: value.price
                        })
        }

        data.push({cards: cards})
        
        // Get the set data
        con.query(`SELECT * FROM sets WHERE code = "${code}"`, function (err, result) {
            if (err) throw err;
            tempset = result

            set.push({code: tempset[0].code, name: tempset[0].name, type: tempset[0].type, card_count: tempset[0].card_count, icon_uri: tempset[0].icon_uri})
            data.push({set: set})

            res.json(data);
        });
    });
})

router.get('/collected-data', (req, res) => {
    let cards_amount
    let collected_amount
    let data

    con.query(`SELECT * FROM allcards`, function (err, result) {
        if (err) throw err;

        cards_amount = Object.entries(result).length

        con.query(`SELECT * FROM cards WHERE username = "${req.session.username}" AND is_in_collection = "1"`, function (err, result) {
            if (err) throw err;
    
            collected_amount = Object.entries(result).length

            data = {total: cards_amount, collected: collected_amount}
    
            res.json(data);
        });

        //res.json(cards_amount);
    });
})

function promiseQuery(query) {
    return new Promise((resolve, reject) => {
        let cards = []
        con.query(query, (err, results) => {
            if (err) {
                return reject(err);
            }
            for (const [key, value] of Object.entries(results)) {  
                cards.push([value.card_name, value.collection_number, value.rarity, value.imageuri_small, value.price, value.is_in_collection, value.set_name, value.card_id, cards.length])
            }
            console.log(cards.length)
            resolve(cards);
        })
    })
}

function renameKeys(obj, newKeys) {
    const keyValues = Object.keys(obj).map(key => {
        const newKey = newKeys[key] || key;
        return { [newKey]: obj[key] };
    });
    return Object.assign({}, ...keyValues);
}

module.exports = router