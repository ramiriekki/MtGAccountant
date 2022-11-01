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
    console.log("Got request!")
    // Get the cards from the database
    let cards = await promiseQuery(`SELECT * FROM allcards ORDER BY name`); // TODO if undefined

    let page
    // If requested url is the my-collection root set page to 1
    if(req.url == "/my-collection/" || req.url == "/my-collection"){page = 1}else{page = parseInt(req.query.page)}
    const limit = 51    // How many cards are displayed on page

    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    const results = {}

    // Check if current page has next page by comparing the 
    // length of cards object to pages last cards index
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
    // length of cards object to pages last cards index
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
    res.json(results);
});

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