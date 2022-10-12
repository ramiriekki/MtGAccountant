const express = require('express');
const init = require("../init");
const auth = require("../authenticate");
const con = init.getCon()
const User = require('../user').User; 

const router = express.Router(); 

router.use(express.json())
router.use(express.urlencoded({extended : true}))
router.use('/public', express.static('public')); // access css files

router.get('/login/', (req, res) => {
    res.render('login.ejs')
})

router.post('/login/', (req, res) => {
    let user
    // Get the sql query values to variable
    function setValue(value){
        user = value
        //console.log(user)
    }

    //console.log(req.body.password)
    sql = `SELECT * FROM users WHERE login_name = "${req.body.username}"`
    con.query(sql, function(err, rows){
        if(err) {
            throw err;
        } else {
            setValue(rows);
            results=JSON.parse(JSON.stringify(user))

            // Check if password is correct, if yes --> redirect, else --> fail
            if (auth.checkHash(req.body.password, results[0].password_salt, results[0].password_hash)) { 
                console.log("Success!")
                // TODO isLoggedIn and link users and collections
                res.redirect('/my-collection')
            } else {
                console.log("Fail")
            }
        }
    })
})

router.get('/register/', (req, res) => {
    res.render('register.ejs')
})

router.post('/register/', (req, res) => {
    //console.log(typeof req.body.email)
    // TODO is the user class needed
    // Insert body data to database
    const usern = req.body.username
    const email = req.body.email
    const password = req.body.password

    let newUser = new User(usern, email, password)

    // TODO this to user class constructor
    let sql = `INSERT INTO users(login_name, email, password_salt, password_hash) VALUES ("${newUser._username}", "${newUser._email}", "${newUser.passwordSalt}", "${newUser.hashedPassword}")`
    con.query(sql)


    //console.log(newUser)
})

module.exports = router