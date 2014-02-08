var main = require('../app/controllers/main'),
    books = require('../app/controllers/books'),
    api = require('../app/controllers/api');

module.exports = function(app,config,passport){

    app.get('/books',books.findAll);
    app.get('/api/:container/:id',api.findByID);
    app.post('/books',books.post);
    app.put('/books/:id',books.updates);
    app.del('/books/:id',books.removeByID);

    app.get('/',main.index);
    app.get('/login',main.login);
    app.get('/logout',main.logout);

    app.get('/auth/google',passport.authenticate('google',config.redirect));
    app.get('/auth/google/return',passport.authenticate('google',config.redirect));
    app.get('/auth/facebook',passport.authenticate('facebook'));
    app.get('/auth/facebook/callback',passport.authenticate('facebook',config.redirect));
    app.get('*',main.notpage);


};
