const {ObjectID} = require('mongodb')
const https = require('https')
const {Faveu} = require('../../../../models/faveu')
const {push, sms} = require('../../../../../config/config')

function selectM_FaveuPush2User(selectedname, doc) {
    var updateddata4DB = {};
    var pushmsg2user = {
        contents: "Your FaveU responds. Click for check!",
        token: doc.tokens[0].token,
        faveun: doc.faveuname,
        usern: doc.username,
        usera: doc.useravatar,
    };

    var userid = new ObjectID(doc._id);
    if (doc.selectionmade === false) {
        if (selectedname === doc.username) {         // Matched
            updateddata4DB.selectionmade = true;
            updateddata4DB.success = true;
            updateddata4DB.userselected = true;
            updateddata4DB.selectedcompetitor = selectedname;

            pushmsg2user.result = "success";
        } else if (selectedname === "reject") {   // reject
            updateddata4DB.selectionmade = true;
            updateddata4DB.rejected = true;
            updateddata4DB.selectedcompetitor = "reject";
            updateddata4DB.completed = true;
            updateddata4DB.completedAt = new Date().getTime();

            pushmsg2user.result = "reject";
        } else {                                        // fail
            updateddata4DB.selectionmade = true;
            updateddata4DB.selectedcompetitor = selectedname;
            updateddata4DB.completed = true;
            updateddata4DB.completedAt = new Date().getTime();

            pushmsg2user.result = "fail";
        }
        // (doc_mobile.hostdeviceId, messagecenter4user, res_mobile, userid, selectionfromfaveu);
        var message = {
            app_id: push.app_id,
            contents: {"en": pushmsg2user.contents},
            include_player_ids: [doc.userdeviceId],
            data: {"result": pushmsg2user.result, 
                    "token": pushmsg2user.token, 
                   "faveun": pushmsg2user.faveun, 
                    "usern": pushmsg2user.usern, 
                    "usera": pushmsg2user.usera
            },
        };
        if (doc.os === 'android') msaage.android_background_layout = {"headings_color": "99ffffff", "contents_color": "ffffffff"}

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
                var update = {};
                res.on('data', function (data) {
                });
                if (res.statusCode === 200) {
                    updateddata4DB.f2userpushsent = true;
                    updateddata4DB.f2userpushsentAt = new Date().getTime()
                    update = {$set: updateddata4DB}
                } else {
                    update = {$set: updateddata4DB, $push: {processerror: 'linkPush'}}
                }
                Faveu.findOneAndUpdate({_id: userid}, update, {new: true}).then((doc1) => {
                    if (!doc1) throw new Error("Fail to Update Push-related Data")
                    console.log('ok-push_mobileselect')
                }, (e1) => {
                    console.log(e1.message);
                });
            });

            req.on('error', function (e) {
            });

            req.write(JSON.stringify(data));
            req.end();
        };
        sendNotification(message);
    }
}

module.exports = {selectM_FaveuPush2User}