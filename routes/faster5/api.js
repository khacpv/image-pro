/**
 * url:
 *  - /faster5
 *  - /faster
 * logging:
 *  - log.info(msg) or log.error(err)
 * */
var express = require('express');
var logic = require('./logic');
var router = express.Router();

router.get('/topic', function (req, res, next) {
    logic.getTopics(function (topics) {
        res.json(topics);
    });
});

router.get('/topic/:id', function (req, res, next) {
    logic.getTopicById(req.params.id, function(err, data){
        console.log(err);
        if(err){
            res.status(err);
            next();
            return;
        }
        res.json(data);
    });
});

router.get('/topic/:id/question', function (req, res, next) {
    logic.getQuestionsByTopicId(req.params.id, function(err, data){
        if(err){
            res.status(404);
            next();
            return;
        }
        res.json(data);
    });
});

module.exports = router;