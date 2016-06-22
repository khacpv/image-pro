var express = require('express');
var mongo = require('../mongodb/Mongo');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    mongo.db.apps.find({}).limit(10).toArray(function (err, doc) {
        if (err) {
            res.status(500).send({err: err});
            return;
        }
        if (doc && doc.length > 0) {
            res.render('index', {title: doc[0].title, apps: doc});
        } else {
            res.render('index', {title: 'Call C++ func', apps: []})
        }
    });
});

module.exports = router;