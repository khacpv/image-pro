var mongoLogic = require(__appname + '/mongodb/logic');

var authLogic = {};

var publicUrls = [
    '',
    'login',
    'registration'
];

authLogic.interceptRequest = function (req, res, next) {
    var url = req.originalUrl;

    // check public urls
    if(url.containsAtLeastOneItemInArray(publicUrls)){
        next();
        return;
    }

    // require header values
    if(url.contains('api') && req.get('Content-Type') === undefined){
        res.status(400).send('you\'re calling an api but has not \'Content-Type\' in header');
        return;
    }

    // check require auth urls
    if(req.get('token') !== undefined && mongoLogic.authValidate(req.get('token'))){
        next();
        return;
    }

    // if not match, return unAuthenticate error
    res.status(401).send('you are not authenticate');
};

module.exports = authLogic;