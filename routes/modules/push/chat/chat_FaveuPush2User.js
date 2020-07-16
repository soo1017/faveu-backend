const {chat2_FaveuPush2User} = require('./chat2_FaveuPush2User');
const {createChatPushMessage} = require('../../general/createChatPushMessage')

function chat_FaveuPush2User(resch, faveuch, chatch) {
    chat2_FaveuPush2User(resch, faveuch, createChatPushMessage(chatch), chatch);
}

module.exports = {chat_FaveuPush2User};