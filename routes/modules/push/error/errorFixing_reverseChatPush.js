const {errorFixing_reverseChatPush2} = require('./errorFixing_reverseChatPush2');
const {createChatPushMessage} = require('../../general/createChatPushMessage')

function errorFixing_reverseChatPush(chatch) {
    errorFixing_reverseChatPush2(createChatPushMessage(chatch), chatch);
}

module.exports = {errorFixing_reverseChatPush};