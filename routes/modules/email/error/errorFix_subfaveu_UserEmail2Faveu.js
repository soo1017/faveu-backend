const {Faveu} = require('./../../../models/faveu');

function errorFix_subfaveu_UserEmail2Faveu(userId) {
    return function(err, data) {
        if (!err) {
            var update = {
                $set: {u2faveuemailsent: true}, 
                $pull: {processerror: 'faveuEmail'}
            }
            Faveu.findOneAndUpdate({_id: userId}, update, {new: true}).then((doc1) => {
                if (!doc1) throw new Error("Fail to Update Email-related Data")
                console.log('ok-errorfix_faveuEmail_no')
            }, (e1) => {
                console.log(e1.message);
            });
        }
    }
}

module.exports = {errorFix_subfaveu_UserEmail2Faveu}