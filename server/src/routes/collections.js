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
    console.log("Got request!")
    // Get the cards from the database
    let cards = await promiseQuery(`SELECT * FROM allcards ORDER BY name`); // TODO if undefined

    let results = []
    const newKeys = { 0: "name", 1: "collection_number", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "" }; // rename keys for angular

    for (const [key, value] of Object.entries(cards)) {  
        const renamedObj = renameKeys(value, newKeys);
        results.push((Object.assign({}, renamedObj)))
    }

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

function renameKeys(obj, newKeys) {
    const keyValues = Object.keys(obj).map(key => {
        const newKey = newKeys[key] || key;
        return { [newKey]: obj[key] };
    });
    return Object.assign({}, ...keyValues);
}

module.exports = router