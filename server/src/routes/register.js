const { json } = require('express');
const express = require('express');
const db = require("../db");
const con = db.getCon()
const bcrypt = require('bcrypt');
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
    const saltRounds = 10;
    //console.log(req.body)

    const usern = req.body.login_name
    const email = req.body.email
    const password = req.body.password
    let hashedPass

    console.log("username: " + usern)
    console.log("email: " + email)
    console.log("password: " + password)

    bcrypt.hash(password, saltRounds, function(err, hash) {
        // console.log("Hashed password: " + hash)
        let sql = `INSERT INTO users(login_name, email, password_hash) VALUES ("${usern}", "${email}", "${hash}")`
        con.query(sql, function (err, result) {
            if (err){
                res.json('fail')
            } else {
                //init.copyCardsTemplate(usern)
                res.json('succes')
            }
        });
    });

    //res.json("in register");
});

module.exports = router