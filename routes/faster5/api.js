/**
 * url:
 *  - /faster5
 *  - /faster
 * logging:
 *  - log.info(msg) or log.error(err)
 * */
var express = require('express');
var logic = require('./logic');
var log = require(__appname + '/utils/log.js');
var mongoLogic = require( __appname + '/mongodb/logic');
var router = express.Router();

router.get('/topic', function (req, res, next) {
    logic.getTopics(function (err, topics) {
        res.json(topics);
    });
});

router.get('/topic/:id', function (req, res, next) {
    logic.getTopicById(req.params.id, function (err, data) {
        if (err) {
            res.status(err);
            next();
            return;
        }
        res.json(data);
    });
});

router.get('/topic/:id/question', function (req, res, next) {
    logic.getQuestionsByTopicId(req.params.id, function (err, data) {
        if (err) {
            res.status(404);
            next();
            return;
        }
        res.json(data);
    });
});

router.post('/registration', function (req, res, next) {
    mongoLogic.addToken(req.body.fb_id);
    res.send({test:'test'});
});

router.post('/login', function (req, res, next) {
    console.log('body:name:'+req.body.name);
    console.log('body:pass:'+req.body.pass);
    res.send({token:'my_token_value'});
});

router.post('/logout', function(req, res, next){
    console.log('user logout');
    res.send('success');
});

module.exports = router;