const db = require("../db/userQueries");
const bcrypt = require('bcryptjs');
const passport = require('../passport');
const { validationResult } = require("express-validator");
const validate = require("./validation")
const asyncHandler = require("express-async-handler")

//note that loginPost is passport.authenticate.
exports.loginPost = passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/",
        failureMessage: true,
});

exports.loginGet = asyncHandler(async (req, res) => {
    res.render("index", {form: "login", user: res.locals.user, passportErrors: res.locals.messages});
})

exports.createUserGet = asyncHandler(async (req, res) => {
    res.render("index", {form: "createUser"});
})

exports.createUserPost = [
    validate.newUser,
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            const newUser = req.body
            return res.status(400).render("index", {form: "createUser", errors: errors.array()})
        }
        const {username, firstName, lastName} = req.body;
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        await db.addUser(username, firstName, lastName, hashedPassword);
    res.redirect('/')
})]

exports.joinGet = asyncHandler(async (req, res) => {
    if(!req.user){
        return res.redirect('/')
    }
    res.render('index', {form: 'join', url : req.url, passed: null})
})

exports.joinPost = asyncHandler(async (req, res) => {
    const possibleAnswers = ['odin', 'top', 'the odin project'];
    const response = req.body["secret-answer"];
    const {id} = req.user
    console.log(response, id)
    if(possibleAnswers.includes(response.toLowerCase())){
        await db.invokeMembership(id);
        res.render('index', {form: 'join', url : req.url, passed: true})
    }else{
        res.render('index', {form: 'join', url : req.url, passed: false})
    }
})