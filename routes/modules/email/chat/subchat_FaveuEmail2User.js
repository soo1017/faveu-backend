const {Chat} = require('../../../models/chat');

function subchat_FaveuEmail2User(chatId) {
    return function(err, data) {
        var update = (err)
                ? {$push: {processerror: 'reverseChatEmail'}}
                : {$set: {u2faveulovechatemailsent: true}}
        
        Chat.findOneAndUpdate({_id: chatId}, update, {new: true}).then((chat1) => {
            if (!chat1) throw new Error("Fail to Update Email-related Data")
            console.log("ok-reverseemail_chat")
        }, (e1) => {
            console.log(e1.message);
        });
    }
}

module.exports = {subchat_FaveuEmail2User}