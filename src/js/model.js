// Models
App.Book = DS.Model.extend({
	isbn : DS.attr('string'),
	title : DS.attr('string'),
	description: DS.attr('string')
});

DS.RESTAdapter.reopen({
	host: 'http://localhost:8080'
});

App.Adapter = DS.RESTAdapter.extend({
	serialize: 'App.BookSerializer'
});

App.BookSerializer = DS.RESTSerializer.extend({
	primaryKey: '_id'
});

App.Store = DS.Store.extend({
	adapter: 'App.Adapter'
});

