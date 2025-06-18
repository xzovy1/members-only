const db = require("../db/queries");
const bcrypt = require('bcryptjs');

exports.loginGet = async (req, res) => {
    res.render("index", {form: "login"});
}
exports.loginPost = async (req, res) => {

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
