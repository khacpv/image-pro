var mongoDb = require('mongodb');

var mongoLogic = {};

var tokens = {
    '1234':true
};

mongoLogic.authValidate = function(token){
    return tokens[token];
};

mongoLogic.addToken = function(token){
    tokens[token] = true;
};

module.exports = mongoLogic;