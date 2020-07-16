const MailComposer = require('nodemailer/lib/mail-composer');

function sendContactEmail(from, to, email, name, message){

    var subject = "FaveU: Customer Contact Email - ";
        subject = subject.concat(name);
        subject = subject.concat(" - ");
        subject = subject.concat(email);
    var text_Message = message;

    var ses_mail = new MailComposer({
        from: from, to: to, subject: subject, text: text_Message
    });

    return new Promise((resolve, reject) => {
        ses_mail.compile().build(function(err, res) {
            err ? reject(err) : resolve(res);
        });
    });
}

module.exports = {sendContactEmail};