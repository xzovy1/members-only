const { Router } = require('express');
const usersController = require('../controllers/usersController');
const { body, validationResult } = require('express-validator');
const usersRouter = Router();


usersRouter.get("/", usersController.loginGet);

usersRouter.get("/sign-up", usersController.createUserGet);
usersRouter.post("/sign-up", usersController.createUserPost);

module.exports = usersRouter;