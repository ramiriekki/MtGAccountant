// TODO Session management & session database table

const express = require('express');
const schedule = require('node-schedule');
const init = require("./init");
const con = init.getCon()
const collections = require('./routes/collections')
const regist = require('./routes/register');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');

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

app.use('/public', express.static('public')); // access css files
app.set('view engine', 'ejs');


const oneDay = 1000 * 1;

//session middleware
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));

app.use(cookieParser());
app.use('/collections', collections)
app.use('/home', regist.routeRegister)

app.get('/home/', (req, res) => {
    //req.session.destroy();
    console.log(req.session)
    res.render('home.ejs')
})

const PORT = 3001

if(process.env.NODE_ENV === "test"){
    module.exports = app, con;
    //module.exports = con;
} else{
    app.listen(PORT, () => console.log(`Server listening on localhost:${PORT}`));
}