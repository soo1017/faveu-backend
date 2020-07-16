const https = require('https');
const {Faveu} = require('./../../../models/faveu');
const {ObjectID} = require('mongodb');
const {push, sms} = require('../../../../config/config')

function errorFixing4Success_Push(docs) {
    var pushmsg2faveu = {
        contents: "Faveu sender wants to reveal and contact you. Click!",
        result: "com",
        usern: docs.username,
        faveun: docs.faveuname,
        lovemessage: docs.u2faveulovemessage,
    };

    var userid = new ObjectID(docs._id);
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

            var updatedDB4success = {};
            var errorupdate = '';

            if (res.statusCode == 200) {
                let update = {
                    $set: {u2faveulovepushsent: true, completed: true, completedAt: new Date().getTime()},
                    $pull: {processerror: "successPush"}
                }
                Faveu.findOneAndUpdate({_id: userid}, update, {new: true}).then((doc1) => {
                    if (!doc1) throw new Error("fail to update push-related data")
                    console.log('ok-push_errorfix_success_no')
                }, (e1) => {
                    console.log(e1.message);
                });
            } 
        });

        req.on('error', function (e) {
            console.log(e);
        });

        req.write(JSON.stringify(data));
        req.end();
    };

    var message = {
        app_id: push.app_id,
        contents: {"en": pushmsg2faveu.contents},
        include_player_ids: [docs.faveudeviceId],
        data: {"result": pushmsg2faveu.result, 
               "faveun": pushmsg2faveu.faveun, 
                "usern": pushmsg2faveu.usern, 
          "lovemessage": pushmsg2faveu.lovemessage},
    };
    if (docs.faveudeviceOS === 'android') msaage.android_background_layout = {"headings_color": "99ffffff", "contents_color": "ffffffff"}

    sendNotification(message);
}

module.exports = {errorFixing4Success_Push};