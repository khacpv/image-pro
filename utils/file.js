/**
 * Time Utils:
 * - get current date/time
 * */

var fs = require('fs');

var fileUtils = {
    read: function(path, callback){
        fs.readFile(path,{encoding:'utf8',flag:'r'},callback);
    }
};

module.exports = fileUtils;