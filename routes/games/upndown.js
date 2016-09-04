var express = require('express');
var mongo = require('../../mongodb/mongodb');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    var test = {
        dbHost: process.env.OPENSHIFT_MONGODB_DB_HOST,
        dbPort: process.env.OPENSHIFT_MONGODB_DB_PORT,
        dbName: process.env.OPENSHIFT_APP_NAME,
        dbAdmin:process.env.OPENSHIFT_MONGODB_DB_USERNAME,
        dbPass: process.env.OPENSHIFT_MONGODB_DB_PASSWORD
    };

    res.render('games/upndown', {title: 'UP and DOWN', test:test})
});

module.exports = router;