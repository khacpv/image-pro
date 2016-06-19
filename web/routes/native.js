var express = require('express');
var nativeLib = require('../native/native');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    var myResult = nativeLib.getString("pham khac");
    res.render('native', { title: 'Native Result' , value: myResult});
});

module.exports = router;