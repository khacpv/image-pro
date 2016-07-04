var express = require('express');
var nativeLib = require('../native/native');
//var imgPro = require('../native/img_pro/imgpro');
var router = express.Router();

/* GET native */
router.get('/', function(req, res, next){
    var result = 'test';
    //result = imgPro.process("./public/images/ggplay.png");
    res.json({face_detect: result});
});

/* POST native */
router.post('/', function(req, res, next) {

    var name = req.body.name;
    var myResult = nativeLib.getString(name);
    res.json({value:myResult});
});

module.exports = router;