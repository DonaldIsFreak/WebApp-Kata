var util = require('util'),
    GoogleStrategy = require('passport-google').Strategy;

module.exports = function(config,passport){

    var hosts = util.format("http://%s:%s",config.ip,config.port);

    // Passport setup
    passport.serializeUser(function(user,done){
        done(null,user);
    });
    passport.deserializeUser(function(obj,done){
        done(null,obj);
    });

    passport.use(new GoogleStrategy(
        {
            returnURL: util.format("%s/%s",hosts,config.google.returnURL),
            realm: util.format("%s/",hosts),
        },
        function(identifier,profile,done){
            process.nextTick(function(){
                profile.identifier = identifier;
                return done(null,profile);
            });
        }
    ));

};


