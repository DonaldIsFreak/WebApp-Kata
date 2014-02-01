App.Router.map(function(){
	this.route('books',{ path : '/'});
	this.route('detail',{ path : '/detail'});
});

App.BooksRoute = Ember.Route.extend({
	model: function(params){
		return this.store.find('book');
	}
});

App.DetailRoute = Ember.Route.extend({
	renderTemplate: function(controller){
		this.render('books/detail');
	}
});
