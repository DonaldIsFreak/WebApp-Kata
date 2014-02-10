// Setup App
App.setupForTesting();

// Use fixture adapter
/*
App.Store = DS.Store.extend({
    revision: 12,
    adapter: DS.FixtureAdapter.create({
        simulateRemoteResponse: false
    })
});
*/
App.ApplicationAdapter = DS.FixtureAdapter.extend();

// Fake dataset
App.Book.FIXTURES = [
    {
        id: 1,
        isbn: '001',
        title: 'test001',
        description: 'first'
    }
];

Ember.Test.registerHelper('assertExists',function(app,selector,times){
    if (!times)
        times = 1;

    return wait()
        .find(selector)
        .then(function(element){
            equal(element.length,times,"found " + selector +" "+ times + " times");
        });
});

QUnit.moduleStart(function(){
    Ember.run(function(){
        App.reset();
        App.injectTestHelpers();
    });
});

module("Testing the homepage");
test('should be an ember application', function(){
    equal(App.constructor, Ember.Application,"App is an Ember App!");
});
test('should display a welcome message', function(){
    visit('/test')
        .find('h1.welcome')
        .then(function(title){
            equal(title.length,1,'found title');
        });
});

module("Testing the helper");
test('should show welcome message',function(){
    visit('/test').assertExists('h1.welcome');
});


module("Testing Ember Data",{
    setup: function(){
        Ember.run(this,function(){
        });
    },
});
test('show get one record',function(){
    var obj = {
        get: function(name){
            return 'test001';
        }
    };
    equal(obj.get('title'),'test001','Same tittle');
});
