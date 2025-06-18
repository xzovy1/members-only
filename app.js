require('dotenv').config();
const path = require("node:path");
const express = require("express");


const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;

const app = express();

const messagesRouter = require('./routes/messagesRouter');
const usersRouter = require('./routes/usersRouter');
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));


app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));


app.use('/', usersRouter);
app.use('/messages', messagesRouter);


app.listen(3000, () => console.log("app listening: http://localhost:3000"));
