var {assignRandomOrder2Competitors} = require('./../../general/assignRandomOrder2Competitors');
var {faveu2_UserPush2Faveu} = require('./faveu2_UserPush2Faveu');
var {ObjectID} = require('mongodb');

function faveu_UserPush2Faveu(resf, selffavf, otherfaveuf) {
    faveu2_UserPush2Faveu(otherfaveuf.os, otherfaveuf.userdeviceId, assignRandomOrder2Competitors(selffavf), resf, new ObjectID(selffavf._id));
}

module.exports = {faveu_UserPush2Faveu};
