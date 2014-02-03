// clear hash string when Facebook callback
if (window.location.hash == '#_=_')
    window.location.href = "/";

// Application
App = Ember.Application.create({LOG_TRANSITIONS: true});

