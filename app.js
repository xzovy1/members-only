require('dotenv').config();
const path = require("node:path");
const express = require("express");
const passport = require('./passport');

const session = require("express-session");

const app = express();

const messagesRouter = require('./routes/messagesRouter');
const usersRouter = require('./routes/usersRouter');
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));


app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true, cookie: {maxAge: 1 * 24 * 60 * 60 * 1000} }));
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
})

app.use('/', usersRouter);
app.use('/messages', messagesRouter);


app.listen(3000, () => console.log("app listening: http://localhost:3000"));

