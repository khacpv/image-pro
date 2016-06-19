var express = require('express');
//var nativeLib = require('../native/native');
var ffi = require('ffi');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('native', { title: 'Native Result' , value: 'native'});
});

module.exports = router;