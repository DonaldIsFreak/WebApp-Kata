
/*
 * GET home page.
 */

exports.index = function(req, res){
    if (!req.isAuthenticated())
        return res.redirect('/login');
    res.render('index', { title: 'WebApp-Kata',userName: req.user.displayName || 'Guest' });
};

exports.login = function(req, res){
    if (req.isAuthenticated())
        return res.redirect('/');
    res.render('login', {});
};

exports.logout = function(req, res){
    req.logout();
    res.render('logout',{});
};

exports.notpage = function(req, res) {
    res.render('notpage',{});
};
