const express = require('express');
const schedule = require('node-schedule');
const init = require("./init");
const auth = require("./authenticate");
const con = init.getCon()
const User = require('./user').User; 
const collections = require('./routes/collections')

// When the server check for updates in the data once
init.getCards()

// Update the database every 10 minutes
// TODO when no longer needed -> minute to every 12 hours or so
var scheduler = schedule.scheduleJob('*/10 * * * *', async function(){
    init.getCards();
    console.log("DB updated. " + new Date())
});

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use('/collections', collections)
app.use('/public', express.static('public')); // access css files
app.set('view engine', 'ejs');

// TODO Route files: Login and card views
// -------------------------- endpoints ---------------------------------
app.get('/login/', (req, res) => {
    res.render('login.ejs')
})

app.post('/login/', (req, res) => {
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

app.get('/register/', (req, res) => {
    res.render('register.ejs')
})

app.post('/register/', (req, res) => {
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

app.get('/home/', (req, res) => {
    res.render('home.ejs')
})

const PORT = 3001

if(process.env.NODE_ENV === "test"){
    module.exports = app, con;
    //module.exports = con;
} else{
    app.listen(PORT, () => console.log(`Server listening on localhost:${PORT}`));
}