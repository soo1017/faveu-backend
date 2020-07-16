const {createEmailchat} = require('../webform/createEmailchat');
const {createEmailchat4Gmail} = require('../webform/createEmailchat4Gmail');
const {subchat_UserEmail2Faveu} = require('./subchat_UserEmail2Faveu')
const {ObjectID} = require('mongodb');
const {emailconstant} = require('../../../../config/config')

function chat_UserEmail2Faveu(fave, chat, sesch) {

    var chatid = new ObjectID(chat._id);

    var from = emailconstant.hostaddress;
    var reg_exp = emailconstant.gmailregexp;
    if (fave.faveuemail.match(reg_exp)) {
        createEmailchat4Gmail(sesch, from, fave.faveuemail, fave.faveuname, chat.room).then(message => {
           var seschParams = {
               RawMessage: { Data: message}
           };
           sesch.sendRawEmail(seschParams, subchat_UserEmail2Faveu(chatid));
        });
    } else {
        createEmailchat(sesch, from, fave.faveuemail, fave.faveuname, chat.room).then(message => {
            var seschParams = {
                RawMessage: { Data: message }
            };
            // console.log("inside Yahoo mail")
            sesch.sendRawEmail(seschParams, subchat_UserEmail2Faveu(chatid));
        });
    }
}

module.exports = {chat_UserEmail2Faveu};