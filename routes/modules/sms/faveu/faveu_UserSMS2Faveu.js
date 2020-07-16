const twilio = require('twilio');
const {push, sms} = require('../../../../config/config')
const client = new twilio(sms.accountSid, sms.authToken);
const {Faveu} = require('../../../models/faveu')
const {ObjectID} = require('mongodb');

function faveu_UserSMS2Faveu(docf) {
    var link_urlpath = "https://www.faveu.com/faveu/link/select?sid=";
    var url_link = link_urlpath.concat(docf._id);
    var message = 'One of your friends faveus you. Please click here: ' + url_link;

    // console.log("inside SMS")
    client.messages.create({
        body: message,
        to: '+15103964657',  // Text this number
        // to: docf.faveuphone,  // Text this number
        from: '+17179743094' // From a valid Twilio number
    }).then((message) => {
        // console.log(message.sid)
        subfaveu_UserSMS2Faveu(docf, 'resolve')
    }).catch((error) => {
        // console.log("error-sms: ", error)
        subfaveu_UserSMS2Faveu(docf, 'reject')
    });
}

function subfaveu_UserSMS2Faveu(doc, mode) {
    var userid = new ObjectID(doc._id);
    var updateddata4faveu = (mode === 'resolve') 
                ? {$set: {u2faveuSMSsent: true}} 
                : {$push: {processerror: "faveuSMS"}}
    // console.log("updateddata4faveu: ", updateddata4faveu)
    Faveu.findByIdAndUpdate({_id: userid}, updateddata4faveu, {new: true}).then((doc1) => {
        // console.log("doc1: ", doc1)
        if (!doc1) throw new Error("Fail to Update SMS-related Data")
        console.log("ok-SMS_faveu")
    }, (e1) => {
        console.log(e1.message);
    });
}

module.exports = {faveu_UserSMS2Faveu}