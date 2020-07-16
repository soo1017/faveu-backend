const twilio = require('twilio');
const {push, sms} = require('../../../../config/config')
const client = new twilio(sms.accountSid, sms.authToken);
const {Faveu} = require('../../../models/faveu')
const {Chat} = require('../../../models/chat')
const {ObjectID} = require('mongodb');

function errorFixing_ChatSMS(chatf) {
    var message = 'Your FaveU wants to caht with you. Please join the chat room with user: ' + favef.faveuname + ', room: ' + chatf.room + '.';
    var chatid = new ObjectID(chat2._id);
    Faveu.findOne({chat: {$all: [chatid]}}).then((favef) => {
        if (!favef) throw new Error('No FaveU! - ChatSMSErrorFixing')
        // console.log("inside SMS")
        client.messages.create({
            body: message,
            to: '+15103964657',  // Text this number
            // to: favef.faveuphone,  // Text this number
            from: '+17179743094' // From a valid Twilio number
        }).then((message) => {
            // console.log(message.sid)
            subchat_UserSMS2Faveu(chatf, 'resolve')
        }).catch((error) => {
            // console.log(error)
            subchat_UserSMS2Faveu(chatf, 'reject')
        });
    })
}

function subchat_UserSMS2Faveu(chat, mode) {
    var chatid = new ObjectID(chat._id);
    var updateddata4chat = (mode === 'resolve') 
                        ? {$set: {u2faveulovechatSMSsent: true}} 
                        : {$push: {processerror: "chatSMS"}}
    Chat.findByIdAndUpdate({_id: chatid}, updateddata4chat, {new: true}).then((fave1) => {
        // console.log("fave1: ", fave1)
        if (!fave1) throw new Error("Fail to Update SMS-related Data")
        console.log("ok-SMS_errorfix_chat")
    }, (e1) => {
        console.log(e1.message);
    });
}


module.exports = {errorFixing_ChatSMS}