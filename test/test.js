var mongoose = require("mongoose");
var superagent = require("superagent");
var expect = require("expect.js");


describe('Checking Express RESTful api server,',function(){
	var _id='',_isbn = '001',_title='A new books',_description='None';

	it('post a new book',function(done){
		superagent.post('http://localhost:8080/books/')
			.send({
				book:{
					isbn : _isbn,
					title : _title, 
					description: _description 
				}
			})
			.end(function(e,res){
				expect(e).to.eql(null);
				expect(res.body.book).to.be.an('object');
				expect(res.body.book.isbn).to.eql(_isbn);
				expect(res.body.book.title).to.eql(_title);
				expect(res.body.book.description).to.eql(_description);
				expect(res.body.book._id.length).to.eql(24);
				done();
				_id = res.body.book._id;
			});
	});

	it('retrieves one book info',function(done){
		superagent.get('http://localhost:8080/books/'+_id)
			.end(function(e,res){
				expect(e).to.eql(null);
				expect(res.body.book).to.be.an('object');
				expect(res.body.book.isbn).to.eql(_isbn);
				expect(res.body.book._id.length).to.eql(24);
				done();
			});
	});

	it('retrives all books info',function(done){
		superagent.get('http://localhost:8080/books')
			.end(function(e,res){
				expect(e).to.eql(null);
				expect(res.body.book.length).to.be.above(0);
				expect(res.body.book.map(function(item){
					return item.isbn;
				})).to.contain(_isbn);
				done();
			});
	});

	it('updates a book info',function(done){
		superagent.put('http://localhost:8080/books/'+_id)
			.send({
				book: {
					description: 'Modify book description'
				}
			})
			.end(function(e,res){
				expect(e).to.eql(null);
				expect(res.status).to.eql(200);
				done();
			});
	});

	it('check book info after update',function(done){
		superagent.get('http://localhost:8080/books/'+_id)
			.end(function(e,res){
				expect(e).to.eql(null);
				expect(res.body.book).to.be.an('object');
				expect(res.body.book._id.length).to.eql(24);
				expect(res.body.book.isbn).to.eql(_isbn);
				expect(res.body.book.title).to.eql(_title);
				expect(res.body.book.description).not.to.eql(_description);
				done();
			});
	});
	it('remove a book',function(done){
		superagent.del('http://localhost:8080/books/'+_id)
			.end(function(e,res){
				expect(e).to.eql(null);
				expect(res.status).to.eql(200);
				done();
			});
	});
});
