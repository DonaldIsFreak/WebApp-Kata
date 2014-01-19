var main = require('../app/controllers/main');
    books = require('../app/controllers/books');

module.exports = function(app,config,passport){

    app.get('/books',books.findAll);
    app.get('/books/:id',books.findByID);
    app.post('/books',books.post);
    app.put('/books/:id',books.updates);
    app.del('/books/:id',books.removeByID);

    app.get('/',main.index);
    app.get('/login',main.login);
    app.get('/logout',main.logout);

    app.get('/auth/google',passport.authenticate('google',config.redirect));
    app.get('/auth/google/return',passport.authenticate('google',config.redirect));
    app.get('*',main.notpage);


};
