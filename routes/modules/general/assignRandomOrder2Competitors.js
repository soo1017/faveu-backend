const {createPushMessage} = require('./createPushMessage');
const {generateArrayOfRandomInteger} = require('./generateArrayOfRandomInteger')

function assignRandomOrder2Competitors(doc) {

    var pushData4Faveu = {
        competitors: [],
        competitorsavatar: [],
    }
    
    var tempArray = generateArrayOfRandomInteger(1, parseInt(doc.numofcompetitors) + 1);
    for (var i=0; i<tempArray.length; i++) {
        if (i === 0) {
            pushData4Faveu.competitors[tempArray[i]] = doc.username
            pushData4Faveu.competitorsavatar[tempArray[i]] = doc.useravatar
        } else {
            pushData4Faveu.competitors[tempArray[i]] = doc.competitors[i].name
            pushData4Faveu.competitorsavatar[tempArray[i]] = doc.competitors[i].avatar
        }
    }

    pushData4Faveu.numofcompetitors = doc.numofcompetitors + 1;
    pushData4Faveu.faveun = doc.faveuname;
    pushData4Faveu.invitecard = doc.invitecard;
    pushData4Faveu.token = doc.tokens[0].token;
    pushData4Faveu.contents = createPushMessage();

    return pushData4Faveu;
}

module.exports = {assignRandomOrder2Competitors};
