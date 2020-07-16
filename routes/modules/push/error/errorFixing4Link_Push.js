const {ObjectID} = require('mongodb')
const https = require('https')
const {Faveu} = require('../../../models/faveu')
const {push, sms} = require('../../../../config/config')

function errorFixing4Link_Push(docl) {
    var updateddata4DB = {};
    var pushmsg2user = {
        contents: "Your FaveU responds. Click for check!",
        token: docl.tokens[0].token,
        faveun: docl.faveuname,
        usern: docl.username,
        usera: docl.useravatar,
    };
    var userid = new ObjectID(docl._id);
    if (docl.selectionmade === true) {
        if (docl.success === true && docl.username === docl.selectedcompetitor) {         // Matched
            pushmsg2user.result = "success";
        } else if (docl.rejected === true && docl.selectedcompetitor === "reject") {
            updateddata4DB.completed = true;
            updateddata4DB.completedAt = new Date().getTime();
            pushmsg2user.result = "reject";
        } else {
            updateddata4DB.completed = true;
            updateddata4DB.completedAt = new Date().getTime();
            pushmsg2user.result = "fail";
        }

        var message = {
            app_id: push.app_id,
            contents: {"en": pushmsg2user.contents},
            include_player_ids: [docl.userdeviceId],
            data: {"result": pushmsg2user.result, 
                    "token": pushmsg2user.token, 
                   "faveun": pushmsg2user.faveun, 
                    "usern": pushmsg2user.usern, 
                    "usera": pushmsg2user.usera
            },
        };
        if (docl.os === 'android') msaage.android_background_layout = {"headings_color": "99ffffff", "contents_color": "ffffffff"}

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
                if (res.statusCode === 200) {
                    var update = {
                        $set: {f2userpushsent: true, f2userpushsentAt: new Date().getTime()},
                        $pull: {processerror: "linkPush"}
                    }
                    Faveu.findOneAndUpdate({_id: userid}, update, {new: true}).then((doc1) => {
                        if (!doc1) throw new Error("Fail to Update Push-related Data")
                        console.log('ok-push_errorfix_link_no')
                    }, (e1) => {
                        console.log(e1.message);
                    });
                }
            });

            req.on('error', function (e) {
            });

            req.write(JSON.stringify(data));
            req.end();
        };
        sendNotification(message);
    }
}

module.exports = {errorFixing4Link_Push}
