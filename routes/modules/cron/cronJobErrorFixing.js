const CronJob = require('cron').CronJob;
const aws = require('aws-sdk');

const {Faveu} = require('../../models/faveu')
const {Chat} = require('../../models/chat')
const {processerrorHandlingFaveu} = require('./errorhandling/processerrorHandlingFaveu')
const {processerrorHandlingChat} = require('./errorhandling/processerrorHandlingChat')

aws.config.loadFromPath('/Users/ilsoolee/Desktop/faveu-2nd/faveu-cordova/backend/faveu/config/config.json')
// aws.config.loadFromPath('./../config/config.json')
// Instantiate SES.
var ses = new aws.SES();

const cronJobErrorFixingFaveu = new CronJob('* 10 * * * *', function() {       // every 10 mins
    Faveu.find({ processerror: { $exists: true, $ne: [] } })
         .sort({createdAt: 1})                                                  // Oldest
         .limit(1)
         .then((doc) => {
            if (doc) processerrorHandlingFaveu(doc, ses)
    })
});

const cronJobErrorFixingChat = new CronJob('* 5 * * * *', function() {       // every 10 mins
    Chat.find({ processerror: { $exists: true, $ne: [] } })
         .sort({createdAt: 1})                                                  // Oldest
         .limit(1)
         .then((chat) => {
            if (chat) processerrorHandlingChat(chat, ses)
         })
});

module.exports = {cronJobErrorFixingFaveu, cronJobErrorFixingChat}