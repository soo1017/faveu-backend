const {errorFixing_ChatEmail} = require('../../email/error/errorFixing_ChatEmail')
const {errorFixing_reverseChatEmail} = require('../../email/error/errorFixing_reverseChatEmail')
const {errorFixing_ChatPush} = require('../../push/error/errorFixing_ChatPush')
const {errorFixing_reverseChatPush} = require('../../push/error/errorFixing_reverseChatPush')
const {errorFixing_ChatSMS} = require('../../sms/error/errorFixing_ChatSMS')

async function processerrorHandlingChat (chat, ses) {
    var errorArry = chat.processerror;
    for (const error in errorArry) {
        var result = await errorFixingChat(error, chat, ses)
        console.log(result)
    }
}

function errorFixingChat(fail, cha, ses) {
    switch (fail) {
        case 'chatEmail':
            errorFixing_ChatEmail(cha, ses);
            break;
        case 'reverseChatEmail':
            errorFixing_reverseChatEmail(cha, ses);
            break;
        case 'chatPush':
            errorFixing_ChatPush(cha);
            break;
        case 'reverseChatPush':
            errorFixing_reverseChatPush(cha);
            break;
        case 'chatSMS':
            errorFixing_ChatSMS(cha);
            break;
        default:
    }
}

module.exports = {processerrorHandlingChat}