const {chat2_UserPush2Faveu} = require('./chat2_UserPush2Faveu');
const {createChatPushMessage} = require('./../../general/createChatPushMessage')

function chat_UserPush2Faveu(resch, faveuch, chatch) {
    chat2_UserPush2Faveu(resch, faveuch, createChatPushMessage(chatch), chatch);
}

module.exports = {chat_UserPush2Faveu};