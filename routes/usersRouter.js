const { Router } = require('express');
const usersController = require('../controllers/usersController');
const { body, validationResult } = require('express-validator');
const usersRouter = Router();
const passport = require('../passport')


usersRouter.get("/", usersController.loginGet);

usersRouter.post("/", usersController.loginPost);

usersRouter.get("/sign-up", usersController.createUserGet);
usersRouter.post("/sign-up", usersController.createUserPost);

module.exports = usersRouter;