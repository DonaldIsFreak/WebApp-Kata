#!/bin/env node
var express = require('express');
var routes = require('./routes');
var apis = require('./routes/api');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/books');

var app = express();

// all environments
app.set('port', 8080);
app.set('ip','127.0.0.1');
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
 }

app.all('/*',function(req,res,next){
	res.header('Access-Control-Allow-Origin','*');
	res.header('Access-COntrol-Allow-Headers','X-Requested-With');
	next();
});
app.get('/', routes.index);
app.get('/books',apis.findAll);
app.get('/books/:id',apis.findByID);
app.post('/books',apis.post);
app.put('/books/:id',apis.updates);
app.del('/books/:id',apis.removeByID);

http.createServer(app).listen(app.get('port'),app.get('ip'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
