/**
 * url:
 *  - /faster5
 *  - /faster
 * logging:
 *  - log.info(msg) or log.error(err)
 * */
var path = require('path');
var file = require(__appname + 'utils/file');
var mongo = require(__appname + 'mongodb/mongodb');
var log = require(__appname + 'utils/log');
var time = require(__appname + 'utils/time');

var logic = {};

logic.getTopics = function (callback) {
    file.read(path.join(__appname, '/data/topics.json'), function (err, data) {
        callback(err, JSON.parse(data));
    });
};

logic.getTopicById = function getTopicById(id, callback) {
    file.read(path.join(__appname, '/data/topics.json'), function (err, data) {
        var dataJson = JSON.parse(data);
        for (var i = 0; i < dataJson.length; i++) {
            if (dataJson[i].id == id) {
                console.log(JSON.stringify(dataJson[i]));
                callback(null, dataJson[i]);
                return;
            }
        }
        callback(404, null);
    });
};

logic.getQuestionsByTopicId = function getQuestionsByTopicId(id, callback) {
    file.read(path.join(__appname, '/data/questions.json'), function (err, data) {
        callback(err, JSON.parse(data));
    });
};

module.exports = logic;