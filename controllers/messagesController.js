const db = require('../db/messageQueries');

exports.messagesListGet = async (req, res) => {
    const messages = await db.getAllMessages();
    const user = res.locals.user || {username: 'guest', admin: false, member_status: false};

    const viewData = {
        user,
        messages,
        hasMessages: messages.length > 0,
        canPostMessages: user.member_status,
        isGuest: user.username === 'guest',
        membershipAction:{
            link: user.username === 'guest' ? '/sign-up': '/become-member',
            text: user.username == 'guest' ? 'Join us' : 'Become a member'
        }
    }
    res.render("messages", viewData)
}

exports.newMessagePost = async (req, res) => {
    const {title, body} = req.body;
    const userId = res.locals.user.id;
    await db.addNewMessage(title, body, userId)
    res.redirect('/messages')
}

exports.deleteMessagePost = async (req, res) => {
    const {id} = req.params;
    await db.deleteMessage(id);
    res.redirect('/messages')
}