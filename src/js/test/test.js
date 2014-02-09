// Setup App
/*
App = Ember.Application.create({
    rootElement: '#qunit-fixture'
});
*/
App.setupForTesting();

module("Testing the homepage",{
    setup: function(){
        App.reset();
        App.injectTestHelpers();
    },
});

test('should be an ember application', function(){
    ok(App.constructor, Ember.Application,"App is an Ember App!");
});

test('should display a welcome message', function(){
    visit('/test')
        .find('h1')
        .then(function(title){
            ok(title.length,1,'found title');
        });
});

