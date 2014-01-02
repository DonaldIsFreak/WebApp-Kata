#!/bin/env node
var express = require('express'),
    routes = require('./routes'),
    apis = require('./routes/api'),
    http = require('http'),
    path = require('path'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    GoogleStrategy = require('passport-google').Strategy;

// connect MongoDB
mongoose.connect('mongodb://localhost/books');

// Passport setup
passport.serializeUser(function(user,done){
    done(null,user);
});
passport.deserializeUser(function(obj,done){
    done(null,obj);
});

passport.use(new GoogleStrategy({
        returnURL: 'http://localhost:8080/auth/google/return',
        realm: 'http://localhost:8080/',
    },
    function(identifier,profile,done){
        process.nextTick(function(){
            profile.identifier = identifier;
            return done(null,profile);
        });
    }
));

var app = express();

// all environments
app.set('port', 8080);
app.set('ip','127.0.0.1');
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.session({secret: 'WebApp-Kata'}));
app.use(passport.initialize());
app.use(passport.session());
// Notice: static document url must before router.
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
 }

app.all('/*',function(req,res,next){
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-COntrol-Allow-Headers','X-Requested-With');
    next();
});

app.get('/',routes.index);

app.get('/books',apis.findAll);
app.get('/books/:id',apis.findByID);
app.post('/books',apis.post);
app.put('/books/:id',apis.updates);
app.del('/books/:id',apis.removeByID);

var redirect_config = {
    successRedirect: '/',
    failureRedirect: '/login'
};

app.get('/auth/google',passport.authenticate('google',redirect_config));
app.get('/auth/google/return',passport.authenticate('google',redirect_config));

app.get('/login',routes.login);

app.get('/logout',routes.logout);
app.get('*',routes.notpage);
http.createServer(app).listen(app.get('port'),app.get('ip'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
