const { Router } = require("express");
const messagesController = require('../controllers/messagesController');
const messagesRouter = Router();

messagesRouter.get('/', messagesController.messagesListGet);

messagesRouter.post('/new', messagesController.newMessagePost);

messagesRouter.post('/:id/delete', messagesController.deleteMessagePost)


module.exports = messagesRouter;