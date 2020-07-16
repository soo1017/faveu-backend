const {createEmailchat} = require('../webform/createEmailchat');
const {createEmailchat4Gmail} = require('../webform/createEmailchat4Gmail');
const {subchat_FaveuEmail2User} = require('./subchat_FaveuEmail2User')
const {ObjectID} = require('mongodb');
const {emailconstant} = require('../../../../config/config')

function chat_FaveuEmail2User(fave, chat, sesch) {

    var chatid = new ObjectID(chat._id);

    var from = emailconstant.hostaddress;
    var reg_exp = emailconstant.gmailregexp;
    if (fave.useremail.match(reg_exp)) {
        // if (fave.faveuemail.match(reg_exp)) {
        createEmailchat4Gmail(sesch, from, fave.useremail, fave.username, chat.room).then(message => {
           var seschParams = {
               RawMessage: { Data: message}
           };
           sesch.sendRawEmail(seschParams, subchat_FaveuEmail2User(chatid));
        });
    } else {
        createEmailchat(sesch, from, fave.useremail, fave.username, chat.room).then(message => {
            var seschParams = {
                RawMessage: { Data: message }
            };
            sesch.sendRawEmail(seschParams, subchat_FaveuEmail2User(chatid));
        });
    }
}

module.exports = {chat_FaveuEmail2User};