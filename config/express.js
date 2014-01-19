var express = require('express');

module.exports = function(app,config,passport){
    app.set('port', config.port);
    app.set('ip',config.ip);
    app.set('views', config.viewPath);
    app.set('view engine', config.viewEngine);
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.cookieParser());
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.session({secret: config.google.secret}));
    app.use(passport.initialize());
    app.use(passport.session());

    // Notice: static document url must before router.
    app.use(express.static(config.staticPath));
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


};
