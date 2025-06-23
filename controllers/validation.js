const {body} = require('express-validator');
const db = require('../db/userQueries')

const alphaErr = "must only contain letters";
const lengthErr = "must be between 1 and 10 characters";
const emptyNameMessage = "Name cannot be empty";
const characterNameMessage = "Name must only contain alphabet letters"

exports.newUser = [
    body("firstName")
        .trim()
        .notEmpty().withMessage("First " + emptyNameMessage)
        .isAlpha().withMessage("First " + characterNameMessage),
    body("lastName")
        .trim()
        .notEmpty().withMessage("Last " + emptyNameMessage)
        .isAlpha().withMessage("Last " + characterNameMessage),
    body("username")
        .trim()
        .notEmpty().withMessage("Username cannot be empty")
        .custom(async value => {
            const users = await db.checkUser(value);
            if(users > 0){
                throw new Error("Username already taken");
            }
        }),
    body("password")
        .trim()
        .notEmpty().withMessage("Password cannot be empty")
        .isLength({min: 8}).withMessage("password must be at least 8 characters long"),
    body("passwordConfirm")
        .trim()
        .notEmpty()
        .custom((value, {req}) => {
            return value === req.body.password
        }).withMessage("Passwords must match")
]

exports.login = [
    body("username")
        .trim()
        .notEmpty()
        .withMessage("Username cannot be empty")
        .custom(async value => {
            if(await db.checkUser(value) == 0){
                throw new Error("Username does not exist")
            }
        }),
    body("password")
        .trim()
        .notEmpty().withMessage("Password cannot be empty")
        .isLength({min: 8}).withMessage("password must be at least 8 characters long"),
]


