var util = require('util'),
    path = require('path'),
    rootPath = path.normalize(__dirname + '/..');


module.exports = {
    appName: 'WebApp-Kata',

    development: {
        db: 'mongodb://localhost/books',
        port: '8080',
        ip: '127.0.0.1',
        root: rootPath,
        viewPath: rootPath + '/app/views',
        staticPath: rootPath + '/public',
        viewEngine: 'jade',
        redirect: {
                successRedirect: '/',
                failureRedirect: '/login',
        },
        google: {
            secret: 'WebApp-Kata',
            returnURL: 'auth/google/return',
            realm: '/',
        }
    },

    test: {
    },

    production:{
    }
};
