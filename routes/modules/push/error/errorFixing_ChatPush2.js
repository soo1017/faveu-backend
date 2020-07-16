const https = require('https');
const {Faveu} = require('../../../models/faveu');
const {Chat} = require('../../../models/chat');
const {push, sms} = require('../../../../config/config')
const {ObjectID} = require('mongodb'); 

function errorFixing_ChatPush2(message2, chat2) {
    var chatid = new ObjectID(chat2._id);
    Faveu.findOne({chat: {$all: [chatid]}}).then((fave2) => {
        if (!fave2) throw new Error('No FaveU! - ChatPushErrorFixing')
        var message = {
            app_id: push.app_id,
            contents: {"en": message2},
            include_player_ids: [fave2.faveudeviceId],
            data: {"result": "comchat",
                    "token": fave2.tokens[0].token,
                    "user": chat2.user[1].name,
                    "room": chat2.room
            },
        };
        if (fave2.faveudeviceOS === 'android') message.android_background_layout = {"image": "https://domain.com/background_image.jpg", "headings_color": "99ffffff", "contents_color": "ffffffff"}

        var sendNotification = function (data) {
            var headers = {
                "Content-Type": "application/json; charset=utf-8",
                'User-Agent': 'curl/7.47.0',
                "Authorization": "Basic keywhichisworking"
            };

            var options = {
                host: "onesignal.com",
                port: 443,
                // port: 3000,
                path: "/api/v1/notifications",
                method: "POST",
                headers: headers
            };

            var req = https.request(options, function (res) {
                var selfdoc;
                res.on('data', function (data) {
                });
                if (res.statusCode === 200) {
                    let update = {
                        $set: {u2faveulovechatpushsent: true},
                        $pull: {processerror: 'chatPush'}
                    }
                    Chat.findOneAndUpdate({ _id: chatid}, update, {new: true}).then((doc) => {
                        if (!doc) throw new Error('Chat Data Update failed')
                        console.log('ok-push_errorfix_chat_no')
                    }).catch((e2) => {
                        // res2.status(500).send(e1);
                        console.log(e2.message)
                    })
                } 
            });

            req.on('error', function (e) {
                console.log(e);
            });

            req.write(JSON.stringify(data));
            req.end();
        };

        sendNotification(message);
    })
};

module.exports = {errorFixing_ChatPush2};
