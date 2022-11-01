const express = require('express');
const axios = require('axios');
const collections = require('./routes/collections')
const app = express();
const db = require("./db");
const con = db.getCon()
const schedule = require('node-schedule');

app.use('/collections', collections)
// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

db.getCards();

// Update the database every minute
// TODO when no longer needed -> minute to every 12 hours or so
var scheduler = schedule.scheduleJob('*/10 * * * *', async function(){
    db.getCards();
    console.log("DB updated. " + new Date())
});

const PORT = 3001
if(process.env.NODE_ENV === "test"){
    module.exports = app, con;
    //module.exports = con;
} else{
    app.listen(PORT, () => console.log(`Server listening on localhost:${PORT}`));
}