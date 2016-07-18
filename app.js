var express = require('express.io');
var path = require('path');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var less = require('less-middleware');
var log = require('./utils/log');

var app = express();
app.http().io();

if (!__dirname) var __dirname = '';
global.__appname = __dirname + '/';

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')), null);
app.use(morgan('dev'), null);
app.use(bodyParser.json(), null);
app.use(bodyParser.urlencoded({extended: true}), null);
app.use(cookieParser(), null);
app.use(less(path.join(__dirname, 'public')), null);
app.use(express.static(path.join(__dirname, 'public')), null);
app.use('/bower', express.static(__dirname + '/bower_components'));

// index
var routes = require('./routes/index');
app.use('/', routes);

// users
var users = require('./routes/users');
app.use('/users', users);

// native
var native = require('./routes/native');
app.use('/native', native);

// games
var games = require('./routes/games');
app.use('/games', games);

// upndown
var upndown = require('./routes/games/upndown');
app.use('/upndown', upndown);
app.use('/up_down', upndown);

// faster5
var faster5 = require('./routes/faster5/faster5');
var faster5Api = require('./routes/faster5/api');
var faster5Socket = require('./routes/faster5/socket');
app.use('/faster5/api', faster5Api);
app.use('/faster5', faster5);
app.use('/faster_5', faster5);
app.io.route('faster5', faster5Socket);

// 404 must below all of other routes.
// If a route should not be found, it must be a 404 error
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler will print stacktrace
if (app.get('env') === 'development') {
    console.log('DEV mode enabled');
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler no stack traces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });

    // write down to log/ files
    if (err.status && err.status >= 500) {
        log.log('error', err.message, {stacktrace: err.stack});
    }
});

module.exports = app;