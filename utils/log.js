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

module.exports = logger;