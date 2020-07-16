const twilio = require('twilio');
const {push, sms} = require('../../../../config/config')
const client = new twilio(sms.accountSid, sms.authToken);
const {Faveu} = require('../../../models/faveu')
const {ObjectID} = require('mongodb');

function errorFixing_SMS(docf, kind) {
    var message = '';
    if (kind === 'faveu') {
        var link_urlpath = "https://www.faveu.com/faveu/link/select?sid=";
        var url_link = link_urlpath.concat(docf._id);
        message = 'One of your friends faveus you. Please click here: ' + url_link;
    } else {
        message = 'Please check this message: ' + docf.u2faveulovemessage;
    }

    // console.log("inside SMS")
    client.messages.create({
        body: message,
        to: '+15103964657',  // Text this number
        // to: docf.faveuphone,  // Text this number
        from: '+17179743094' // From a valid Twilio number
    }).then((message) => {
        // console.log(message.sid)
        suberrorFixing_SMS(docf, 'resolve', kind)
    }).catch((error) => {
        // console.log(error)
        suberrorFixing_SMS(docf, 'reject', kind)
    });
}

function suberrorFixing_SMS(doc, mode, kind) {
    var userid = new ObjectID(doc._id);
    var updateddata4faveu = '';
    if (kind === 'faveu') {
        updateddata4faveu = (mode === 'resolve') 
        ? {$set: {u2faveuSMSsent: true}, $pull: {processerror: "faveuSMS"}} 
        : {}
    } else {
        updateddata4faveu = (mode === 'resolve') 
        ? {$set: {u2faveuloveSMSsent: true}, $pull: {processerror: "successSMS"}}
        : {}
    }
    Faveu.findByIdAndUpdate({_id: userid}, updateddata4faveu, {new: true}).then(() => {
        if (!doc1) throw new Error("Fail to Update SMS-related Data")
        console.log("ok-SMS_errorfix")
    }, (e1) => {
        console.log(e1.message);
    });
}


module.exports = {errorFixing_SMS}