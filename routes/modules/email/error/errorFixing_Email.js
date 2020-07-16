const {createEmailfaveu} = require('./../webform/createEmailfaveu');
const {createEmailfaveu4Gmail} = require('./../webform/createEmailfaveu4Gmail');
const {createEmailsuccess} = require('./../webform/createEmailsuccess')
const {createEmailsuccess4Gmail} = require('./../webform/createEmailsuccess4Gmail')
const {errorFix_subfaveu_UserEmail2Faveu} = require('./errorFix_subfaveu_UserEmail2Faveu')
const {errorFix_subsuccess_UserLoveEmail2Faveu} = require('./errorFix_subsuccess_UserLoveEmail2Faveu')
const {ObjectID} = require('mongodb');
const {emailconstant} = require('../../../../config/config')

function errorFixing_Email(doc, kind, ses) {

    var userid = new ObjectID(doc._id);
    if (kind === 'faveu') {
        var link_urlpath = "https://www.faveu.com/faveu/link/select?sid=";
        var url_link = link_urlpath.concat(doc._id);
    }

    var from = emailconstant.hostaddress;
    var reg_exp = emailconstant.gmailregexp;
    if (doc.faveuemail.match(reg_exp)) {
        if (kind === 'faveu') {
            createEmailfaveu4Gmail(ses, from, doc.faveuemail, doc.faveuname, url_link).then(message => {
                var sesParams = {
                    RawMessage: { Data: message}
                };
                ses.sendRawEmail(sesParams, errorFix_subfaveu_UserEmail2Faveu(userid));
             });
        } else {
            createEmailsuccess4Gmail(ses, from, doc.faveuemail, doc.u2faveulovemessage).then(message => {
                var sesParams = {
                    RawMessage: { Data: message}
                };
                ses.sendRawEmail(sesParams, errorFix_subsuccess_UserLoveEmail2Faveu(userid));
             });
        }
        
    } else {
        if (kind === 'faveu') {
            createEmailfaveu(ses, from, doc.faveuemail, doc.faveuname, url_link).then(message => {
                var sesParams = {
                    RawMessage: { Data: message }
                };
                ses.sendRawEmail(sesParams, errorFix_subfaveu_UserEmail2Faveu(userid));
            });
        } else {
            createEmailsuccess(sess, from, docs.faveuemail, doc.u2faveulovemessage).then(message => {
                var sessParams = {
                    RawMessage: { Data: message }
                };
                sess.sendRawEmail(sessParams, errorFix_subsuccess_UserLoveEmail2Faveu(userid));
            });
        }
    }
}

module.exports = {errorFixing_Email};