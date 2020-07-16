const {errorFixing_Email} = require('../../email/error/errorFixing_Email')
const {errorFixing_Push} = require('../../push/error/errorFixing_Push')
const {errorFixing_SMS} = require('../../sms/error/errorFixing_SMS')

async function processerrorHandlingFaveu (docf, ses) {
    var errorArry = docf.processerror;
    for (const error in errorArry) {
        var result = await errorFixing(error, docf, ses)
        console.log(result)
    }
}

function errorFixing(fail, doc, ses) {
    switch (fail) {
        case 'faveuEmail':
            errorFixing_Email(doc, 'faveu', ses);
            break;
        case 'successEmail':
            errorFixing_Email(doc, 'success', ses);
            break;
        case 'faveuPush':
            errorFixing_Push(doc, 'faveu');
            break;
        case 'successPush':
            errorFixing_Push(doc, 'success');
            break;
        case 'linkPush':
            errorFixing_Push(doc, 'link');
            break;
        case 'faveuSMS':
            errorFixing_SMS(doc, 'faveu');
            break;
        case 'successSMS':
            errorFixing_SMS(doc, 'success');
            break;
        default:
    }
}

module.exports = {processerrorHandlingFaveu}