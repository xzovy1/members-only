const db = require('../db/messageQueries');

exports.messagesListGet = async (req, res) => {
    const messages = await db.getAllMessages();
    res.render("messages", {messages: messages})
    console.log(messages)
}

exports.newMessagePost = async (req, res) => {
    const {title, body} = req.body;
    const userId = res.locals.user.id;
    await db.addNewMessage(title, body, userId)
    res.redirect('/messages')
}