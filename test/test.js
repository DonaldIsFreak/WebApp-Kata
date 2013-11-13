var mongoose = require("mongoose");
var superagent = require("superagent");
var expect = require("expect.js");


describe('Checking Express RESTful api server,',function(){
	var _isbn = '001',_title='A new books',_description='None';

	it('post a new book',function(done){
		superagent.post('http://localhost:8080/books/')
			.send({
				isbn : _isbn,
				title : _title, 
				description: _description 
			})
			.end(function(e,res){
				expect(e).to.eql(null);
				expect(res.body).to.be.an('object');
				expect(res.body.isbn).to.eql(_isbn);
				expect(res.body.title).to.eql(_title);
				expect(res.body.description).to.eql(_description);
				expect(res.body._id.length).to.eql(24);
				done();
			});
	});
	it('retrieves one book info',function(done){
		superagent.get('http://localhost:8080/books/'+_isbn)
			.end(function(e,res){
				expect(e).to.eql(null);
				expect(res.body).to.be.an('object');
				expect(res.body.isbn).to.eql(_isbn);
				expect(res.body._id.length).to.eql(24);
				done();
			});
	});

	it('retrives all books info',function(done){
		superagent.get('http://localhost:8080/books')
			.end(function(e,res){
				expect(e).to.eql(null);
				expect(res.body.length).to.be.above(0);
				expect(res.body.map(function(item){
					return item.isbn;
				})).to.contain(_isbn);
				done();
			});
	});


	it('updates a book info',function(done){
		superagent.put('http://localhost:8080/books/'+_isbn)
			.send({
				description: 'Modify book description'
			})
			.end(function(e,res){
				expect(e).to.eql(null);
				expect(res.body).to.be.an('object');
				expect(res.body.msg).to.eql('success');
				done();
			});
	});

	it('check book info after update',function(done){
		superagent.get('http://localhost:8080/books/'+_isbn)
			.end(function(e,res){
				expect(e).to.eql(null);
				expect(res.body).to.be.an('object');
				expect(res.body._id.length).to.eql(24);
				expect(res.body.isbn).to.eql(_isbn);
				expect(res.body.title).to.eql(_title);
				expect(res.body.description).not.to.eql(_description);
				done();
			});
	});

	it('remove a book',function(done){
		superagent.del('http://localhost:8080/books/'+_isbn)
			.end(function(e,res){
				expect(e).to.eql(null);
				expect(res.body).to.be.an('object');
				expect(res.body.msg).to.eql('success');
				done();
			});
	});
});
