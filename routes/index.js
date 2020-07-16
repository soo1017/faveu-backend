const express = require('express');
const router = express.Router();
const aws = require('aws-sdk');
const {Unsubscriber} = require('./models/unsubscriber');
const {Chat} = require('./models/chat');
const _ = require('lodash');

const {contact_Email2Admin} = require('./modules/email/web/contact/contact_Email2Admin');

// Load your AWS credentials and try to instantiate the object.
// aws.config.loadFromPath('./../config/config.json');
// // Instantiate SES.
// var ses = new aws.SES();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'FaveU' });
});

/* GET from Email to unsubscribe */
/* ----------------------------- */
router.get('/unsubscribe', function(req, res) {
    var emailId = req.query.id;

    res.header('Content-Type', 'text/html');
    res.render('unsubscribe_landing.hbs', {'unsub_email': emailId}, (err, html) => {
        if (!err) {
            res.status(200).send(html);
        } else {
            res.status(400).send('Fail to render');
        }
    });
});

/* Post to unsubscribe
/* --------------------------------------  */
router.post('/unsubscribe/confirm', function(req, res) {
    var unsubscriber;
    var unsub = _.pick(req.body, ['unsub_email']);
    unsubscriber = new Unsubscriber({email: unsub.unsub_email});
    Unsubscriber.findOne({email: unsub.unsub_email}).then((doc) => {
        if (doc) return res.status(404).send('Already unsubscribed')
        return unsubscriber.save()
    }).then((doc1) => {
        if (!doc1) return res.status(404).send('Not found');
        res.status(200).send('ok');
    }).catch((e) => {
        return res.status(500).send(e);
    })
});

/* GET to Contact */
/* -------------- */
router.get('/contact', function(req, res) {
    res.header('Content-Type', 'text/html');
    res.render('contact.hbs', (err_tou, html) => {
        if (!err_tou) {
            res.status(200).send(html);
        } else {
            res.status(400).send('Fail to render');
        }
    });
});

/* POST to Contact */
/* --------------- */
router.post('/contact', function(req, res) {
    var contact;
    contact = _.pick(req.body, ['contact_email', 'contact_name', 'contact_inputtext']);

    contact_Email2Admin(res, ses, contact.contact_email, contact.contact_name, contact.contact_inputtext).then((data) => {
        res.status(200).send('ok')
    }).catch((err) => {
        res.status(404).send('Fail to send email')
    });
});

/* GET for term of use */
/* ------------------- */
// router.post('/termsofuse', function(req, res, next) {
router.get('/termsofuse', function(req, res) {

    res.header('Content-Type', 'text/html');
    res.render('termsofuse_landing.hbs', (err_tou, html) => {
        if (!err_tou) {
            res.status(200).send(html);
        } else {
            res.status(400).send('Fail to render');
        }
    });
});

/* GET for Privacy */
/* --------------- */
router.get('/privacy-policy', function(req, res) {

    res.header('Content-Type', 'text/html');
    res.render('privacy_landing.hbs', (err_pp, html) => {
        if (!err_pp) {
            res.status(200).send(html);
        } else {
            res.status(400).send('Fail to render');
        }
    });
});


module.exports = router;
