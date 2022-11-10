const express = require('express');
const axios = require('axios');
const collections = require('./routes/collections')
const register = require('./routes/register')
const app = express();
const db = require("./db");
const con = db.getCon()
const schedule = require('node-schedule');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const mysqlStore = require('express-mysql-session')(sessions);
const cors = require('cors')

// mysqlStore options
const options ={
    connectionLimit: 10,
    password: process.env.ADMIN_PASSWORD,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    createDatabaseTable: true
}

const sessionStore = new mysqlStore(options);

app.use(sessions({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    store: sessionStore,
    cookie: { /*httpOnly: true, */ secure: false,  maxAge: 1000 * 30 },
    resave: false
}));

const corsOptions = {
    origin: "http://localhost:4200",
    credentials: true
};

app.use(cors(corsOptions));

app.use(cookieParser());

app.use('/collections', collections)
app.use('/home', register)

// Add headers before the routes are defined
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
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