const https = require('https');
const {Faveu} = require('../../../models/faveu');
const {push, sms} = require('../../../../config/config')

function faveu2_UserPush2Faveu(os, token, messages, res2, userid) {
    // console.log("inside push: app_id - ", push.app_id)
    var message = {
        app_id: push.app_id,
        contents: {"en": messages.contents},
        include_player_ids: [token],
        data: {"result": "link",
                "token": messages.token,
                "numofcompetitors": messages.numofcompetitors,
                "invitecard": messages.invitecard,
                "faveun": messages.faveun,
                "competitors": messages.competitors,
                "competitorsavatar": messages.competitorsavatar,
        },
    };
    if (os === 'android') message.android_background_layout = {"image": "https://domain.com/background_image.jpg", "headings_color": "99ffffff", "contents_color": "ffffffff"}

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
            var update = (res.statusCode == 200)
                ? {$set: {faveupushenabled: true, faveudeviceOS: os, u2faveupushsent: true, faveudeviceId: token}}
                : {$set: {faveupushenabled: true, faveudeviceOS: os, faveudeviceId: token}, $push: {processerror: 'faveuPush'}}
            
            Faveu.findById(userid).then((doc) => {
                if (!doc) throw new Error("Not found")
                selfdoc = doc;
                return Faveu.updateOne({ _id: userid}, update, {new: true})
            }).then((doc1) => {
                if (!doc1) {
                    if (selfdoc.u2faveuemailsent || selfdoc.u2faveuSMSsent) {
                        throw new Error('Push - Not found')
                    } else {
                        throw new Error('All failed')
                    }
                }
                res2.status(200).json('ok')
            }).catch((e1) => {
                res2.status(500).json(e1.message);
            })
        });

        req.on('error', function (e) {
            console.log(e);
        });

        req.write(JSON.stringify(data));
        req.end();
    };

    sendNotification(message);
};

module.exports = {faveu2_UserPush2Faveu};
