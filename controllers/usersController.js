const db = require("../db/userQueries");
const bcrypt = require('bcryptjs');
const passport = require('../passport');
const { validationResult } = require("express-validator");
const validate = require("./validation")


//note that loginPost is passport.authenticate.
exports.loginPost = passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/",
        failureMessage: true,
});


exports.loginGet = async (req, res) => {
    res.render("index", {form: "login", user: res.locals.user, passportErrors: res.locals.messages});
}

exports.createUserGet = async (req, res) => {
    res.render("index", {form: "createUser"});
}

exports.createUserPost = [
    validate.newUser,
    async (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            const newUser = req.body
            return res.status(400).render("index", {form: "createUser", errors: errors.array()})
        }
    try{
        const {username, firstName, lastName} = req.body;
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        await db.addUser(username, firstName, lastName, hashedPassword);
    }catch(err){
        console.error(err);
        next(err);
    }
    res.redirect('/')
}]

exports.joinGet = async (req, res) => {
    if(!req.user){
        return res.redirect('/')
    }
    res.render('index', {form: 'join', url : req.url})
}

exports.joinPost = async (req, res) => {
    const possibleAnswers = ['odin', 'top', 'the odin project'];
    const response = req.body["secret-answer"];
    const {id} = req.user
    console.log(response, id)
    if(possibleAnswers.includes(response.toLowerCase())){
        await db.invokeMembership(id);
    }
    res.redirect('/')
}
