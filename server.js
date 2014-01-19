#!/bin/env node
var express = require('express'),
    http = require('http'),
    mongoose = require('mongoose'),
    passport = require('passport');

// load configurations
var env = process.env.NODE_ENV || 'development',
    config = require('./config/config')[env];

// connect MongoDB
mongoose.connect(config.db);

// bootstrap passport config
require('./config/passport')(config,passport);

var app = express();

// bootstrap express configurations
require('./config/express')(app,config,passport);

// bootstrap routes configurations
require('./config/routes')(app,config,passport);

http.createServer(app).listen(app.get('port'),app.get('ip'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
