var util = require('util'),
    FacebookStrategy = require('passport-facebook').Strategy,
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

    passport.use(new FacebookStrategy(
        {
            clientID: config.facebook.clientID,
            clientSecret: config.facebook.clientSecret,
            callbackURL: "http://localhost:8080/auth/facebook/callback"
        },
        function(accessToken,refreshToken,profile,done){
            done(null,profile);
        }
    ));

};


