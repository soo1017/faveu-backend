const {Faveu} = require('./../../../models/faveu');

function subsuccess_UserLoveEmail2Faveu(userId) {
    return function(err, data) {
        var update = (err)
                ? {$push: {processerror: 'successEmail'}}
                : {$set: {u2faveuloveemailsent: true, completed: true, completedAt: new Date().getTime()}}

        Faveu.findOneAndUpdate({_id: userId}, update, {new: true}).then((doc1) => {
            if (!doc1) throw new Error("Fail to Update Email-related Data")
            console.log('ok-email_success')
        }, (e1) => {
            console.log(e1.message);
        });
    }
}

module.exports = {subsuccess_UserLoveEmail2Faveu}