var main = require('../app/controllers/main'),
    api = require('../app/controllers/api');

module.exports = function(app,config,passport){

    app.get('/api/:container',api.findAll);
    app.get('/api/:container/:id',api.findById);
    app.post('/api/:container',api.createNew);
    app.put('/api/:container/:id',api.updateById);
    app.del('/api/:container/:id',api.removeById);

    app.get('/',main.index);
    app.get('/login',main.login);
    app.get('/logout',main.logout);

    app.get('/auth/google',passport.authenticate('google',config.redirect));
    app.get('/auth/google/return',passport.authenticate('google',config.redirect));
    app.get('/auth/facebook',passport.authenticate('facebook'));
    app.get('/auth/facebook/callback',passport.authenticate('facebook',config.redirect));
    app.get('*',main.notpage);


};
