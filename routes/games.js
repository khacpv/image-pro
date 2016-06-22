var express = require('express');
var mongo = require('../mongodb/mongodb');
var router = express.Router();

var insertSampleData = function(){
    mongo.db.apps.insert([
        {title:'UP and DOWN', description:'Game for children'},
        {title:'Image Pro', description:'Image processing'}
    ], function(err,docs){
        console.log('insert success');
    });
};

/* GET home page. */
router.get('/', function (req, res, next) {
    mongo.db.apps.find({}).limit(10).toArray(function (err, doc) {
        if (err) {
            res.status(500).send({err: err});
            return;
        }
        if (doc && doc.length > 0) {
            res.render('games', {title: doc[0].title, apps: doc});
        } else {
            // insert if no data
            insertSampleData();
            res.render('games', {title: 'List game by pham khac', apps: []})
        }
    });
});

module.exports = router;