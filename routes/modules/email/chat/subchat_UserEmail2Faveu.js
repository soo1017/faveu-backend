const {Chat} = require('../../../models/chat');

function subchat_UserEmail2Faveu(chatId) {
    return function(err, data) {
        var update = (err) 
                ? {$push: {processerror: 'chatEmail'}}
                : {$set: {u2faveulovechatemailsent: true}}
        
        Chat.findOneAndUpdate({_id: chatId}, update, {new: true}).then((chat1) => {
            if (!chat1) throw new Error("Fail to Update Email-related Data")
            console.log("ok-email_chat")
        }, (e1) => {
            console.log(e1.message);
        });
    }
}

module.exports = {subchat_UserEmail2Faveu}