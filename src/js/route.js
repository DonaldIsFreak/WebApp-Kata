// Routers
App.Router.map(function(){
	this.route('index',{ path : '/'});
	this.route('detail',{ path : '/detail'});
  this.route('test',{ path: '/test'});
});

App.IndexRoute = Ember.Route.extend({
	model: function(params){
		return this.store.find('book');
	}
});

App.DetailRoute = Ember.Route.extend({
	renderTemplate: function(controller){
		this.render('books/detail');
	}
});
