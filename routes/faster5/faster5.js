var express = require('express');
var mongo = require('../../mongodb/mongodb');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('games/faster5', {title: 'Faster5'})
});

module.exports = router;