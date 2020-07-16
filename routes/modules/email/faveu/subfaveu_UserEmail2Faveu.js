const {Faveu} = require('./../../../models/faveu');

function subfaveu_UserEmail2Faveu(userId) {
    return function(err, data) {
        // console.log("err: ", err)
        var update = (err)
                ? {$push: {processerror: 'faveuEmail'}}
                : {$set: {u2faveuemailsent: true}}
        
        Faveu.findOneAndUpdate({_id: userId}, update, {new: true}).then((doc1) => {
            if (!doc1) throw new Error("Fail to Update Email-related Data")
            console.log('ok-email_faveu')
        }, (e1) => {
            console.log(e1.message);
        });
    }
}

module.exports = {subfaveu_UserEmail2Faveu}