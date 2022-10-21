const express = require('express');
const init = require("../init");
const auth = require("../authenticate");
const con = init.getCon()
const User = require('../user').User; 

const routeRegister = express.Router(); 

routeRegister.use(express.json())
routeRegister.use(express.urlencoded({extended : true}))
routeRegister.use('/public', express.static('public')); // access css files

let session

routeRegister.get('/login/', (req, res) => {
    res.render('login.ejs')
})

routeRegister.post('/login/', (req, res) => {
    let user
    console.log(req.body)
    console.log(req.session)
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

                // session = req.session
                // Link username to session
                req.session.user = req.body.username
                console.log(req.session.user)
                res.redirect('/collections/my-collection')
            } else {
                console.log("Fail")
            }
        }
    })
})

routeRegister.get('/register/', (req, res) => {
    res.render('register.ejs')
})

routeRegister.post('/register/', (req, res) => {
    //console.log(typeof req.body.email)
    // TODO is the user class needed
    // Insert body data to database
    const usern = req.body.username
    const email = req.body.email
    const password = req.body.password

    let newUser = new User(usern, email, password)

    let sql = `INSERT INTO users(login_name, email, password_salt, password_hash) VALUES ("${newUser._username}", "${newUser._email}", "${newUser.passwordSalt}", "${newUser.hashedPassword}")`
    con.query(sql, function (err, result) {
        if (err){
            res.render('register.ejs')
        } else {
            init.copyCardsTemplate(usern)
            res.redirect('/home/login')
        }
    });

    //console.log(newUser)
})

routeRegister.get('/logout', function (req, res, next) {
    // logout logic

    // clear the user from the session object and save.
    // this will ensure that re-using the old session id
    // does not have a logged in user
    req.session.user = null
    req.session.save(function (err) {
        if (err) next(err)
    
        // regenerate the session, which is good practice to help
        // guard against forms of session fixation
        req.session.regenerate(function (err) {
            if (err) next(err)
            res.redirect('/home')
        })
    })
})

module.exports = {routeRegister, session}