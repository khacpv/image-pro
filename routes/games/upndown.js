var express = require('express');
var mongo = require('../../mongodb/mongodb');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('games/upndown', {title: 'UP and DOWN'})
});

module.exports = router;