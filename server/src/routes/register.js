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

let session

router.post('/register/', async (req, res) => {
    console.log(req.session)

    console.log("Got request!")
    const saltRounds = 10;
    
    console.log(req.session)

    const usern = req.body.login_name
    const email = req.body.email
    const password = req.body.password

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
                res.json('success')
            }
        });
    });

    //res.json("in register");
});

router.post('/login/', (req, res) => {
    console.log(req.session.username)

    let user = {}

    console.log(req.body)

    sql = `SELECT * FROM users WHERE login_name = "${req.body.login_name}"`
    con.query(sql, function(err, result){
        if(err) {
            throw err;
        } else {

            for (const [key, value] of Object.entries(result)) {  
                user = {
                    login_name: value.login_name,
                    password_hash: value.password_hash
                }
            }
            console.log(user)

            bcrypt.compare(req.body.password, user.password_hash, function(err, result) {
                console.log(result)
                if (result == true){
                    session = req.session
                    session.username = req.body.login_name
                    req.session.save()

                    console.log(req.session)
                    console.log(req.session.username)

                    res.send(req.session)
                }
            });
            //res.json('in login')
        }
    })
})

router.get('/logout', function (req, res, next) {
    console.log(req.session.username)
    console.log(req.session)

    
    // clear the user from the session object and save.
    // this will ensure that re-using the old session id
    // does not have a logged in user
    if (req.session) {
        req.session.destroy(err => {
            if (err) {
                res.status(400).send('Unable to log out')
            } else {
                res.send('Logout successful')
            }
    });
    } else {
    res.end()
    }
})

module.exports = router