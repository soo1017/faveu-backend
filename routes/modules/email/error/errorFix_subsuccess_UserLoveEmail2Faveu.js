const {Faveu} = require('./../../../models/faveu');

function errorFix_subsuccess_UserLoveEmail2Faveu(userId) {

    return function(err, data) {
        if (!err) {
            var updateddata4success = {
                u2faveuloveemailsent: true,
                completed: true,
                completedAt: new Date().getTime()
            }
            var update = {
                $set: updateddata4success,
                $pull: {processerror: 'successEmail'}
            }
            Faveu.findOneAndUpdate({_id: userId}, update, {new: true}).then((doc1) => {
                if (!doc1) throw new Error("Fail to Update Email-related Data")
                console.log('ok-errorfix_successEmail_no')
            }, (e1) => {
                console.log(e1.message);
            });
        }
    }
}

module.exports = {errorFix_subsuccess_UserLoveEmail2Faveu}