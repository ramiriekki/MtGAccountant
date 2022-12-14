const express = require('express');
const schedule = require('node-schedule');
const init = require("./init");
const con = init.getCon()
const collections = require('./routes/collections')
const regist = require('./routes/register');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const mysqlStore = require('express-mysql-session')(sessions);

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

const  sessionStore = new mysqlStore(options);

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

app.use(sessions({
    secret: process.env.SESSION_SECRET,
    saveUninitialized:true,
    store: sessionStore,
    cookie: { /*httpOnly: true, secure: true, */ maxAge: 1000 * 30 },
    resave: false
}));

app.use(cookieParser());
app.use('/collections', collections)
app.use('/home', regist.routeRegister)

const PORT = process.env.PORT

if(process.env.NODE_ENV === "test"){
    module.exports = app, con;
    //module.exports = con;
} else{
    app.listen(PORT, () => console.log(`Server listening on localhost:${PORT}`));
}

app.get('/home/', (req, res) => {
    //req.session.destroy();
    console.log(req.session.user)
    res.render('home.ejs', {user: req.session.user})
})