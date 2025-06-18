const { Router } = require("express");
const messagesController = require('../controllers/messagesController');
const messagesRouter = Router();

messagesRouter.get('/', messagesController.messagesListGet);


module.exports = messagesRouter;