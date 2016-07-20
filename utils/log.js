/**
 * Logger with winston
 * require: var log = require('log')
 * ex: log.info("something")
 * */
var winston = require('winston');

// log
var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.File)({
            name: 'info-file',
            filename: './log/winston-info.log',
            level: 'info'
        }),
        new (winston.transports.File)({
            name: 'error-file',
            filename: './log/winston-error.log',
            level: 'error'
        })
    ]
});

/**
 * dump request object with:
 * url,
 * cookies,
 * ip,
 * method,
 * body,
 * query,
 * path...
 * @param req request
 * */
logger.dumpReq = function (req) {
    if (__env !== 'development') {
        return;
    }
    console.log('===== DUMP ============');
    console.log('base url: ' + req.baseUrl);
    console.log('cookies: ' + JSON.stringify(req.cookies));
    console.log('signedCookies: ' + JSON.stringify(req.signedCookies));
    console.log('cache-control: ' + (req.fresh ? 'no-cache' : 'has-cache'));
    console.log('hostname: ' + req.hostname);
    console.log('ip: ' + req.ip);
    console.log('subdomains: ' + JSON.stringify(req.subdomains));
    console.log('xhr(jquery): ' + req.xhr);
    console.log('protocol: ' + req.protocol);
    console.log('route: ' + req.route);
    console.log('method: ' + req.method);
    console.log('originalUrl: ' + req.originalUrl);
    console.log('https: ' + req.secure);
    console.log('params: ' + JSON.stringify(req.params));
    console.log('query: ' + JSON.stringify(req.query));
    console.log('path: ' + req.path);
    console.log('body: ' + JSON.stringify(req.body));
};

/**
 * @param req request
 * @param field contain 'Content-Type', 'content-type' or 'Something'
 * */
logger.getField = function (req, field) {
    return req.get(field);
};

module.exports = logger;