// Setup App
App = Ember.Application.create({
    rootElement: '#qunit-fixture'
});

App.setupForTesting();

test('should be an ember application', function(){
    ok(App.constructor, Ember.Application,"App is an Ember App!");
});

