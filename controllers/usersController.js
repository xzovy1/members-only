const db = require("../db/userQueries");
const bcrypt = require('bcryptjs');
const passport = require('../passport')


//note that loginPost is NOT a function.
exports.loginPost = passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/"
});

exports.loginGet = async (req, res) => {
    res.render("index", {form: "login", user: res.locals.user});
}


exports.createUserGet = async (req, res) => {
    res.render("index", {form: "createUser"});
}

exports.createUserPost = async (req, res, next) => {
    try{
        const {username, firstName, lastName} = req.body;
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        await db.addUser(username, firstName, lastName, hashedPassword);
    }catch(err){
        console.error(err);
        next(err);
    }
    res.redirect('/')
}
