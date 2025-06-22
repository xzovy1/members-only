const db = require('../db/messageQueries');

const cipher = (message, cipherAmount = 1) => {
let string = '';
 for(let i = 0; i < message.length; i++){
    let code = message.charCodeAt(i);
    if((code >= 65 && code <= 90) || (code >= 97 && code <= 122 )){
        code = code + cipherAmount
        if(code > 122 || (code > 90 && code < 97)){
            code -= 26;
        }        
    };
    let letter = String.fromCharCode(code);
    string += letter
    }
return string;
}
exports.messagesListGet = async (req, res) => {
    const messages = await db.getAllMessages();
    const user = res.locals.user || {username: 'guest', admin: false, member_status: false};
    if(user.username == 'guest'){
        messages.forEach(message => {
            message.body = cipher(message.body);
            message.username = cipher(message.username);
            message.date_time = cipher(message.date_time);
        })
    }
    console.log(messages)
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