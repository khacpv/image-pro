/**
 * url:
 *  - /faster5
 *  - /faster
 * logging:
 *  - log.info(msg) or log.error(err)
 * */
var express = require('express');
var router = express.Router();
var log = require(__appname+'/utils/log');
var time = require(__appname+'/utils/time');
var logic = require('./logic');

// views

router.get('/', function (req, res, next) {
    log.info('faster5 homepage: ' + time.millisecond());
    res.render('games/faster5', {title: 'Faster5'})
});

module.exports = router;