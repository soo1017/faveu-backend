const express = require('express')
const router = express.Router()
const {User} = require('./models/user')
const {Faveu} = require('./models/faveu')
const {Unsubscriber} = require('./models/unsubscriber')
const {Chat} = require('./models/chat')
const aws = require('aws-sdk');

const {faveu_UserEmail2Faveu} = require('./modules/email/faveu/faveu_UserEmail2Faveu')
const {faveu_UserSMS2Faveu} = require('./modules/sms/faveu/faveu_UserSMS2Faveu')
const {faveu_UserPush2Faveu} = require('./modules/push/faveu/faveu_UserPush2Faveu')
const {selectM_FaveuPush2User} = require('./modules/push/mobilelink/selection/selectM_FaveuPush2User')
const {selectW_FaveuPush2User} = require('./modules/push/weblink/selection/selectW_FaveuPush2User')
const {success_UserLoveEmail2Faveu} = require('./modules/email/success/success_UserLoveEmail2Faveu')
const {success_UserLovePush2Faveu} = require('./modules/push/success/success_UserLovePush2Faveu')
const {success_UserLoveSMS2Faveu} = require('./modules/sms/success/success_UserLoveSMS2Faveu')
const {renderSorryWebpage2Faveu} = require('./modules/web/rendering/renderSorryWebpage2Faveu')
const {renderExpiredOrCompletedWebpage2Faveu} = require('./modules/web/rendering/renderExpiredOrCompletedWebpage2Faveu')
const {renderWebLink2Faveu} = require('./modules/web/rendering/renderWebLink2Faveu')
const {chat_UserEmail2Faveu} = require('./modules/email/chat/chat_UserEmail2Faveu')
const {chat_UserSMS2Faveu} = require('./modules/sms/chat/chat_UserSMS2Faveu.js')
const {chat_UserPush2Faveu} = require('./modules/push/chat/chat_UserPush2Faveu')
const {chat_FaveuEmail2User} = require('./modules/email/chat/chat_FaveuEmail2User')
const {chat_FaveuPush2User} = require('./modules/push/chat/chat_FaveuPush2User')

var {ObjectID} = require('mongodb')
var _ = require('lodash')

// Load your AWS credentials and try to instantiate the object.
aws.config.loadFromPath('/Users/ilsoolee/Desktop/faveu-2nd/faveu-cordova/backend/faveu/config/config.json')
// aws.config.loadFromPath('./../config/config.json')
// Instantiate SES.
var ses = new aws.SES();

/* GET faveu listing. */
router.get('/', function(req, res) {
    res.send('respond with a resource');
});


/* POST User Data from Mobile */
/* -------------------------- */
router.post('/user', function(req, res) {
    var user;
    var body;
    if (req.body.name && req.body.email) {
        body = _.pick(req.body, ['name', 'email'])
        body.createdAt = new Date().getTime();
        user = new User(body);

        User.find({email: req.body.email}).then((doc) => {
            if (doc.length !== 0) throw new Error('Your Email Already Used!')  // 404 - not found
            return user.save()
        }).then((doc1) => {
            if (!doc1) throw new Error('Register Failed!')
            res.status(200).send(doc1)              // 200
        }).catch((e) => {
            return res.status(500).json({error: e.message})  // Internal server error
        })
    } else {
        return res.status(404).send('Bad Request!')        // 400 - Bad request
    }
});

/* POST FaveU Data from Mobile */
/* --------------------------- */
router.post('/faveu', function(req, res) {
    var bodyf;
    var favef;
    var temp_userId;
    if (req.body.faveuemail && req.body.faveuphone) {
        bodyf = _.pick(req.body, [ 'username', 'useremail', 'useravatar', 'differentusername', 'userdeviceId',
                                 'faveuname', 'faveuemail', 'faveuphone', 'competitors', 'numofcompetitors', 
                                 'invitecard', 'os']);
    } else {
        if (req.body.faveuemail) {
            bodyf = _.pick(req.body, [ 'username', 'useremail', 'useravatar', 'differentusername', 'userdeviceId',
                                    'faveuname', 'faveuemail', 'competitors', 'numofcompetitors', 'invitecard', 'os']);
        } else if (req.body.faveuphone) {
            bodyf = _.pick(req.body, ['username', 'useremail', 'useravatar', 'differentusername', 'userdeviceId',
                                    'faveuname', 'faveuphone', 'competitors', 'numofcompetitors', 'invitecard', 'phonecountry', 'os']);
        } else {}
    }
    favef = new Faveu(bodyf);
    // console.log("fave: ", favef);
    var selffav;


    Unsubscriber.findOne({$or: [{email: req.body.faveuemail}, {phone: req.body.faveuphone}]}).then((sub) => {
        // console.log("doc: ", sub);
        if (sub) throw new Error('You FaveU Are Unsubscribed!')  // 404 - not found
        return Faveu.find({useremail: req.body.useremail, 
                        $or: [{faveuemail: req.body.faveuemail}, {faveuphone: req.body.faveuphone}]})
                    .count()
    }).then((count) => {
        // console.log("count: ", count);
        if (count >= 3) throw new Error('Your Try Times Limited!')  // 404 - not found
        return User.findOne({email: req.body.useremail})
    }).then((user) => {
        // console.log("user: ", user)
        if (!user) throw new Error("Need To Register!")
        temp_userId = user._id
        // console.log("favef: ", favef)
        return favef.save()
    }).then(async (fav) => {
        // console.log('fav: ', fav)
        if (!fav) throw new Error("FaveU's Save Failed!")
        selffav = fav
        favef.generateAuthToken(temp_userId)
        if (fav.faveuemail && !fav.u2faveuemailsent) await faveu_UserEmail2Faveu(fav, ses)
        if (fav.faveuphone && !fav.u2faveuSMSsent) await faveu_UserSMS2Faveu(fav)
        return Faveu.find({useremail: req.body.faveuemail})
                    .sort({createdAt: -1})
                    .limit(1)
    }).then(async (otherfav) => {
        // console.log("doc1: ", otherfav)
        if (otherfav.length === 0) return res.status(200).send('FaveU without App')
        await faveu_UserPush2Faveu(res, selffav, otherfav[0])
        // res.status(200).send('ok')
    }).catch((e) => {
        res.status(500).json({error: e.message})
    })
       
});

/* POST Fail from Mobile */
/* --------------------- */
router.post('/fail', function(req, res) {
    var fail = _.pick(req.body, ['token']);

    var updateDBdata4complete = {
        completed: true,
        completedAt: new Date().getTime()
    };

    // console.log("req.body: ", req.body)

    Faveu.findByTokenAndUpdate(fail.token, updateDBdata4complete).then((doc) => {
        // console.log("doc: ", doc)
        if (!doc) throw new Error('OK')
        res.status(200).send('ok');
    }).catch((e) => {
        return res.status(500).json({error: e.message})
    })
});

/* POST Success SelfContact from Mobile */
/* ------------------------------------ */
router.post('/success/selfcontact', function(req, res) {
    var successselfcontact = _.pick(req.body, ['token']);
    var updateDBdata4complete = {
        completed: true,
        completedAt: new Date().getTime()
    }
    Faveu.findByTokenAndUpdate(successselfcontact.token, updateDBdata4complete).then((doc) => {
        // console.log("doc_success: ", doc)
        if (!doc) throw new Error('OK')
        res.status(200).send('ok');
    }).catch((e) => {
        return res.status(500).json({error: e.message})
    })
});

/* POST Success Message from Mobile */
/* -------------------------------- */
router.post('/success/message', function(req, res) {
    var successmsg = _.pick(req.body, ['token', 'lovemessage']);
    var updateDBdata4complete = {
        u2faveulovemessage: successmsg.lovemessage
    }

    // console.log("req.body: ", req.body)
    Faveu.findByTokenAndUpdate(successmsg.token, updateDBdata4complete).then(async (doc) => {
        // console.log("doc_success: ", doc)
        if (!doc) throw new Error('No Corresponding FaveuDB!');
        if (doc.faveuemail) await success_UserLoveEmail2Faveu(doc, ses, successmsg.lovemessage)
        if (doc.faveupushenabled) await success_UserLovePush2Faveu(doc, successmsg.lovemessage)
        if (doc.faveuphone) await success_UserLoveSMS2Faveu(doc, successmsg.lovemessage);
        res.status(200).send('ok')
    }).catch((e) => {
        return res.status(500).json({error: e.message});
    })
});

/* POST Link Selection from Mobile */
/* ------------------------------- */
router.post('/mobilelink/select', function(req, res) {
    var mobilelink = _.pick(req.body, ['selectedname', 'token']);
    var updateDBdata4mobileselect = {
        selectedcompetitor: mobilelink.selectedname
    }

    // console.log("req.body: ", req.body)
    Faveu.findByTokenAndUpdate(mobilelink.token, updateDBdata4mobileselect).then(async (doc) => {
        // console.log("doc-mobilelink-post: ", doc)
        if (!doc) throw new Error('System Error!');
        if (doc.selectionmade) throw new Error('Selection Made or Expired!');
        await selectM_FaveuPush2User(mobilelink.selectedname, doc);
        res.status(200).send('ok');
    }).catch((e) => {
        return res.status(500).json({error: e.message});
    })
});

/* GET Link Selection from Web */
/* --------------------------- */
router.get('/link/select', function(req, res) {
    if (req.query && req.query.sid) {
        Faveu.findOne({_id: req.query.sid}).then(async (doc) => {
            if (!doc) throw new Error('No Corresponding Faveu');
            if (!doc.completed && !doc.expired) {
                !doc.selectionmade ? await renderWebLink2Faveu(req, res, doc) : await renderSorryWebpage2Faveu(req, res, doc);
            } else {
                await renderExpiredOrCompletedWebpage2Faveu(req, res, doc);
            }
            res.status(200).send('ok')
        }).catch((e) => {
            return res.status(500).json({error: e.message});
        })
    } else {
        return res.status(404).json({error: 'Bad Request!'});
    }
});

/* POST Link Selection from Web */
/* --------------------------- */
router.post('/link/select', function(req, res) {
    var sid = req.headers.referer.split('sid=');

    Faveu.findOne({_id: sid[1]}).then(async (doc) => {
        if (!doc) throw new Error('System Error!');
        if (doc.selectionmade) throw new Error('Selection Made or Expired!');
        await selectW_FaveuPush2User(req.body.selected, doc)
        res.status(200).send('ok');
    }, (e) => {
        return res.status(500).json({error: e.message});
    });
});

/* POST for Chat/Create Creation */
/* ------------------------------ */
router.post('/chat/create', function(req, res) {
    var body1;
    var selfcha1;
    var selffav = null;
    var useruse = true;
    if (req.body.room && req.body.user) {
        body1 = _.pick(req.body, ['room', 'user', 'creatoremail']);
    } 
    var chat = new Chat(body1);
    body1.createdAt = new Date().getTime();
    // var chat = new Chat(body1);
    // console.log("req.body: ", req.body)

    Chat.findOne({room: req.body.room, user: {$elemMatch: {name: req.body.user[0].name}}, closed: false}).then((cha) => {
        if (cha) throw new Error(`ChatRoom '${req.body.room}' Existed!`)  // 404 - not found
        return Faveu.find({$or: [{username: req.body.user[0].name, useremail: req.body.creatoremail, faveuname: req.body.user[1].name}, 
                                    {username: req.body.user[1].name, faveuname: req.body.user[0].name, faveuemail: req.body.creatoremail},
                                    {username: req.body.user[1].name, faveuname: req.body.user[0].name}]})
    }).then((fav) => {                                                   // returned cursor (array)
        if (fav.length === 0) throw new Error('No Corresponding FaveU!')
        var flag = false;
        fav.forEach((doc) => {
            if (doc.username === req.body.user[0].name 
                && doc.useremail === req.body.creatoremail 
                && doc.faveuname === req.body.user[1].name
                && flag === false) {
                selffav = doc
                flag = true
                // console.log("hi0")
            }
        })
        if (!selffav) { 
            fav.forEach((doc) => {
                if (doc.username === req.body.user[1].name 
                    && doc.faveuemail === req.body.creatoremail 
                    && doc.faveuname === req.body.user[0].name) {
                    selffav = doc
                    useruse = false
                    // console.log("hi1")
                }
            })
        }
        if (!selffav) {
            fav.forEach((doc) => {
                if (doc.username === req.body.user[1].name 
                    && doc.faveuname === req.body.user[0].name) {
                    selffav = doc
                    useruse = false
                    // console.log("hi2")
                }
            })
        }
        return chat.save()
    }).then((cha1) => {
        if (!cha1) throw new Error('ChatRoom Saving Failed!')
        var newdata = new ObjectID(cha1._id)
        // var newdata = { chatid: new ObjectID(cha1._id), closed: false }
        selfcha1 = cha1;
        return Faveu.findByIdAndUpdate(selffav._id,
                                    {$push: {chat: newdata}},
                                    { new: true })
    }).then(async (fav1) => {
        // console.log("useruse: ", useruse)
        if (!fav1) throw new Error('Corresponding FaveU Update Failed!')  // 404 - not found
        // send out CHATROOM to your Faveu thru Email, SMS, Notification
        // await
        if (useruse === true) {
            if (fav1.faveuemail) await chat_UserEmail2Faveu(fav1, selfcha1, ses);
            if (fav1.faveuphone) await chat_UserSMS2Faveu(fav1, selfcha1);
            if ((fav1.faveudeviceId !== '' || fav1.faveudeviceId !== null) && fav1.faveupushenabled === true) await chat_UserPush2Faveu(res, fav1, selfcha1);
        } else {
            if (fav1.useremail) await chat_FaveuEmail2User(fav1, selfcha1, ses);
            if (fav1.userdeviceId !== '' || fav1.userdeviceId !== null) await chat_FaveuPush2User(res, fav1, selfcha1);
        }
        // console.log("res: ", res.req)
        return res.status(200).json(selfcha1)
    }).catch((e) => {
        return res.status(500).json({error: e.message});
    })
});

/* GET for Chat/ChatRoom */
/* -------------------- */
router.post('/chat/chatroom', function(req, res) {
// router.get('/chat/chatroom', function(req, res) {
    var name = req.body.username;
    var room = req.body.roomname;

    Chat.findOne({room: room, user: { $elemMatch : {name: name}}, closed: false}).then((doc) => {
        // console.log("chat: ", doc)
        if (!doc) throw new Error('Chat Room Not Exist!')
        return res.status(200).json(doc)
    }).catch((e) => {
        return res.status(400).json({error: e.message});
    })
});

/* POST for Chat/Delete */
/* -------------------- */
router.post('/chat/delete', function(req, res) {
    var id = req.body.id
    var room = req.body.room
    var updateDBdata4closed = {
        closed: true,
    }

    Chat.findOneAndUpdate({_id: id, room: room, closed: false}, 
                        {$set: updateDBdata4closed}, 
                        // {useFindAndModify: false},
                        {new: true}).then((cha) => {
        if (!cha) throw new Error('No Matched Chat Room!')
        return res.status(200).json('ok')
    }).catch((e) => {
        return res.status(500).json({error: e.message});
    })
});

/* POST for Chat/Message */
/* -------------------- */
router.post('/chat/leave', function(req, res) {
    var updateDBdata4content = {
        content: req.body.content,
    }

    Chat.findOneAndUpdate({_id: req.body.id, room: req.body.room, closed: false}, 
                        {$set: updateDBdata4content}, 
                        // {useFindAndModify: false},
                        {new: true}).then((doc) => {
        // console.log("doc-update: ", doc)
        if (!doc) throw new Error(`ChatRoom '${room}' Exit Failed!`)
        // console.log("res.req-update: ", res.req)
        return res.status(200).json('ok')
    }).catch((e) => {
        return res.status(500).json({error: e.message});
    })
});

module.exports = router;