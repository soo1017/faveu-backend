const {createEmailsuccess} = require('./../webform/createEmailsuccess');
const {createEmailsuccess4Gmail} = require('./../webform/createEmailsuccess4Gmail');
const {subsuccess_UserLoveEmail2Faveu} = require('./subsuccess_UserLoveEmail2Faveu')
const {ObjectID} = require('mongodb');
const {emailconstant} = require('../../../../config/config')

function success_UserLoveEmail2Faveu(docs, sess, lovemessage) {
    var userid = new ObjectID(docs._id);

    var from = emailconstant.hostaddress;
    var reg_exp = emailconstant.gmailregexp;
    if (docs.faveuemail.match(reg_exp)) {
        createEmailsuccess4Gmail(sess, from, docs.faveuemail, lovemessage).then(message => {
           var sessParams = {
               RawMessage: { Data: message}
           };
           sess.sendRawEmail(sessParams, subsuccess_UserLoveEmail2Faveu(userid));
        });
    } else {
        createEmailsuccess(sess, from, docs.faveuemail, lovemessage).then(message => {
            var sessParams = {
                RawMessage: { Data: message }
            };
            sess.sendRawEmail(sessParams, subsuccess_UserLoveEmail2Faveu(userid));
        });
    }
}

module.exports = {success_UserLoveEmail2Faveu}