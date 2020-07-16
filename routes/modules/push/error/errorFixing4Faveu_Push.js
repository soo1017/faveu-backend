const https = require('https');
const {Faveu} = require('../../../models/faveu')
const {push, sms} = require('../../../../config/config')
const {ObjectID} = require('mongodb');

function errorFixing4Faveu_Push(docf, messages) {
    var userid = new ObjectID(docf._id)
    var message = {
        app_id: push.app_id,
        contents: {"en": messages.contents},
        include_player_ids: [docf.faveudeviceId],
        data: {"result": "link",
                "token": messages.token,
                "numofcompetitors": messages.numofcompetitors,
                "invitecard": messages.invitecard,
                "competitors": messages.competitors,
                "competitorsavatar": messages.competitorsavatar,
        }
    }
    if (docf.faveudeviceOS === 'android') message.android_background_layout = {"image": "https://domain.com/background_image.jpg", "headings_color": "99ffffff", "contents_color": "ffffffff"}

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
            res.on('data', function (data) {
            });
            if (res.statusCode == 200) {
                let update = {
                    $set: {u2faveupushsent: true},
                    $pull: {processerror: 'faveuPush'}
                }
                Faveu.findOneAndUpdate({_id: userid}, update, {new: true}).then((doc) => {
                    if (!doc) throw new Error("Not found")
                    console.log('ok-push_errorfix_faveu_no')
                }).catch((e1) => {
                    console.log(e1.message)
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
};

module.exports = {errorFixing4Faveu_Push};
