var mongojs = require('mongojs');

var Mongo = {};

Mongo.IP = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
Mongo.PORT = process.env.OPENSHIFT_NODEJS_PORT || '52086';
Mongo.dbName = process.env.OPENSHIFT_APP_NAME || 'image';
Mongo.user = process.env.OPENSHIFT_MONGODB_DB_USERNAME || 'admin';
Mongo.pass = process.env.OPENSHIFT_MONGODB_DB_PASSWORD || 'T3k_111XG72d';

Mongo.connectionString = function () {
    return Mongo.user + ":" +
        Mongo.pass + "@" +
        Mongo.IP + ':' +
        Mongo.PORT + '/' +
        Mongo.dbName;
};

var db = mongojs(Mongo.connectionString(), ['apps']);
var apps = db.collection('apps');

Mongo.db = db;
Mongo.apps = apps;

module.exports = Mongo;