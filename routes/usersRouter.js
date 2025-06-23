const { Router } = require('express');
const usersController = require('../controllers/usersController');
const { body, validationResult } = require('express-validator');
const usersRouter = Router();


usersRouter.get("/", usersController.loginGet);


//passport.authenticate function
usersRouter.post("/", usersController.loginPost);

usersRouter.get("/sign-up", usersController.createUserGet);
usersRouter.post("/sign-up", usersController.createUserPost);

usersRouter.get('/join', usersController.joinGet);
usersRouter.post('/join', usersController.joinPost);

usersRouter.get("/log-out", (req, res, next) => {
    req.logout((err) => {
        if(err){
            return next(err);
        }
        res.redirect("/");
    })
})

module.exports = usersRouter;