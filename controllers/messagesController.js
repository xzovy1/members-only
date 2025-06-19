const db = require('../db/messageQueries');

exports.messagesListGet = async (req, res) => {
    const messages = await db.getAllMessages();
    let user;
    if(res.locals.user){
        user = res.locals.user;
    }else {
        user = {username: 'guest', admin: false, is_member: false}
    }
    console.log(user)
    res.render("messages", {messages: messages, user: user})
}

exports.newMessagePost = async (req, res) => {
    const {title, body} = req.body;
    const userId = res.locals.user;
    await db.addNewMessage(title, body, userId)
    res.redirect('/messages')
}

exports.deleteMessagePost = async (req, res) => {
    console.log(req.params)
    const {id} = req.params;
    await db.deleteMessage(id);
    res.redirect('/messages')
}