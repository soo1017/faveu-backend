const {errorFixing_ChatPush2} = require('./errorFixing_ChatPush2');
const {createChatPushMessage} = require('../../general/createChatPushMessage')

function errorFixing_ChatPush(chatch) {
    errorFixing_ChatPush2(createChatPushMessage(chatch), chatch);
}

module.exports = {errorFixing_ChatPush};