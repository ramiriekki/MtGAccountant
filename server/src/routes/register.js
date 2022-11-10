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

router.post('/register/', async (req, res) => {
    console.log("Got request!")
    // Get the cards from the database
    console.log(req.body)

    res.json("in register");
});

module.exports = router