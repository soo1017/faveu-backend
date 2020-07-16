const {sendContactEmail} = require('./sendContactEmail');
const {emailconstant} = require('../../../../../config/config')

function contact_Email2Admin(res, ses, email, name, inputtext) {

    var from = emailconstant.hostaddress;
    var to = "faveureply@gmail.com";
    sendContactEmail(from, to, email, name, inputtext).then(message => {
        var sesParams = {RawMessage: { Data: message}};

        // ses.sendRawEmail(sesParams, function(err, data) {
        //     if(err) return res.status(404).send('Fail to send email')
        //     else res.status(200).send('ok')
        // });
        ses.sendRawEmail(sesParams, function(err, data) {
            return new Promise((resolve, reject) => {
                err ? reject(err) : resolve(data)
            })
        });
    });
}

module.exports = {contact_Email2Admin};