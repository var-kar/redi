const http = require('http');
const config = require('../config/index');
const moment = require('moment');
const chalk = require('chalk');
const bootstrap = require('../bootstrap');

function statusCodeColour(statusCode) {
    if (statusCode >= 500) {
        return chalk.red(statusCode);
    } else if (statusCode >= 400) {
        return chalk.yellow(statusCode);
    } else if (statusCode >= 300) {
        return chalk.cyan(statusCode);
    } else if (statusCode >= 300) {
        return chalk.green(statusCode);
    } else if (statusCode >= 200) {
        return chalk.green(statusCode);
    } else {
        return chalk.gray(statusCode);
    }
}

function methodColour(method) {
    switch(method) {
        case 'GET':
            return chalk.bold.bgGreen.black(method);
            break;
        case 'POST':
            return chalk.bold.bgBlue.black(method);
            break;
        case 'PUT':
            return chalk.bold.bgYellow.black(method);
            break;
        case 'PATCH':
            return chalk.bold.bgMagenta.black(method);
            break;
        case 'OPTIONS':
            return chalk.bold.bgWhite.black(method);
            break;
        case 'DELETE':
            return chalk.bold.bgRed.black(method);
            break;
        case 'HEAD':
            return chalk.bold.bgWhite.black(method);
            break;
    }
}
const server = http.createServer();
server.on('request', function(q, r) {
    let startTime = +new Date();
    q.on('data', function(chunk) {
        console.log(chunk);
    }).on('end', function() {
    });
    bootstrap.init(q, r, function(statusCode, headers, response) {
        r.statusCode = statusCode;
        //r.setHeader('Content-Type', 'text/plain');
        r.end('HTTP/1.1 400 Bad Request\r\n\r\n');
        let timeTaken = (+new Date()) - startTime;
        console.log(methodColour(q.method) + ' ' + chalk.green(q.url) + ' ' + chalk.magenta(timeTaken + 'ms') + ' ' + statusCodeColour(statusCode) + ' ' + chalk.gray(moment(new Date()).format('YYYY-MM-DD HH:mm:ss')));
    });
});

server.listen(config.gateway.port, function() {
    console.log(chalk.magenta(config.gateway.name) + " gateway started at port " + chalk.cyan(config.gateway.port) + " " + chalk.gray(moment(new Date()).format('YYYY-MM-DD HH:mm:ss')));
    console.log('');
});