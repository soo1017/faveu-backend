const twilio = require('twilio');
const {push, sms} = require('../../../../config/config')
const client = new twilio(sms.accountSid, sms.authToken);
const {ObjectID} = require('mongodb');
const {Faveu} = require('./../../../models/faveu')

function success_UserLoveSMS2Faveu(docf, msgs) {
    var message = 'Please check this message: ' + msgs;

    // console.log("inside SMS")
    client.messages.create({
        body: message,
        to: '+15103964657',  // Text this number
        // to: docf.faveuphone,  // Text this number
        from: '+17179743094' // From a valid Twilio number
    }).then((message) => {
        // console.log(message.sid)
        success_UserLoveSMS2Faveu(docf, 'resolve')
    }).catch((error) => {
        success_UserLoveSMS2Faveu(docf, 'reject')
    });
}

function success_UserLoveSMS2Faveu(doc, mode) {
    var userid = new ObjectID(doc._id);
    var updateddata4faveu = (mode === 'resolve') ? {$set: {u2faveuloveSMSsent: true}} : {$push: {processerror: "successSMS"}}
    Faveu.findByIdAndUpdate({_id: userid}, updateddata4faveu, {new: true}).then((doc1) => {
        if (!doc1) throw new Error("Fail to Update SMS-related Data")
        console.log('ok-SMS_success')
    }, (e1) => {
        console.log(e1.message);
    });
}

module.exports = {success_UserLoveSMS2Faveu}