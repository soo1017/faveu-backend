const {createEmailfaveu} = require('./../webform/createEmailfaveu');
const {createEmailfaveu4Gmail} = require('./../webform/createEmailfaveu4Gmail');
const {subfaveu_UserEmail2Faveu} = require('./subfaveu_UserEmail2Faveu')
const {ObjectID} = require('mongodb');
const {emailconstant} = require('../../../../config/config')

function faveu_UserEmail2Faveu(docf, sesf) {

    var userid = new ObjectID(docf._id);
    var link_urlpath = "https://www.faveu.com/faveu/link/select?sid=";
    var url_link = link_urlpath.concat(docf._id);

    var from = emailconstant.hostaddress;
    var reg_exp = emailconstant.gmailregexp;
    // console.log("from: ", from)
    // console.log("reg_exp: ", reg_exp)
    if (docf.faveuemail.match(reg_exp)) {
        createEmailfaveu4Gmail(sesf, from, docf.faveuemail, docf.faveuname, url_link).then(message => {
           var sesfParams = {
               RawMessage: {Data: message}
           };
        //    console.log("inside Gmail")
           sesf.sendRawEmail(sesfParams, subfaveu_UserEmail2Faveu(userid));
        });
    } else {
        createEmailfaveu(sesf, from, docf.faveuemail, docf.faveuname, url_link).then(message => {
            var sesfParams = {
                RawMessage: {Data: message }
            };
            // console.log("inside Yahoo email")
            sesf.sendRawEmail(sesfParams, subfaveu_UserEmail2Faveu(userid));
        });
    }
}

module.exports = {faveu_UserEmail2Faveu};