const {createEmailchat} = require('../webform/createEmailchat');
const {createEmailchat4Gmail} = require('../webform/createEmailchat4Gmail');
const {subchat_UserEmail2Faveu} = require('./../chat/subchat_UserEmail2Faveu')
const {ObjectID} = require('mongodb');
const {Faveu} = require('./../../../models/faveu')
const {emailconstant} = require('../../../../config/config')

function errorFixing_ChatEmail(chat, sesch) {
    var chatid = new ObjectID(chat._id);
    var from = emailconstant.hostaddress;
    var reg_exp = emailconstant.gmailregexp;
    Faveu.findOne({chat: {$all: [chatid]}}).then((fave) => {
        if (!fave) throw new Error('No FaveU! - ChatErrorFixing')
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
                sesch.sendRawEmail(seschParams, subchat_UserEmail2Faveu(chatid));
            });
        }
    }).catch((e) => {
        console.log(e.message)
    })
}

module.exports = {errorFixing_ChatEmail};