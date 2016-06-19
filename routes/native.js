var express = require('express');
var nativeLib = require('../native/native');
var router = express.Router();

/* GET native */
router.post('/', function(req, res, next) {

    var name = req.body.name;
    var myResult = nativeLib.getString(name);
    res.json({value:myResult});
});

module.exports = router;