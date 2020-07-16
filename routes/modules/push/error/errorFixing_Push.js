const {assignRandomOrder2Competitors} = require('./../../general/assignRandomOrder2Competitors');
const {errorFixing4Faveu_Push} = require('./errorFixing4Faveu_Push');
const {errorFixing4Success_Push} = require('./errorFixing4Success_Push')
const {errorFixing4Link_Push} = require('./errorFixing4Link_Push')

function errorFixing_Push(docf, kind) {
    if (kind === 'faveu') {
        errorFixing4Faveu_Push(docf, assignRandomOrder2Competitors(docf))
    } else if (kind === 'success') {
        errorFixing4Success_Push(docf)
    } else if (kind === 'link') {
        errorFixing4Link_Push(docf)
    }
}

module.exports = {errorFixing_Push};