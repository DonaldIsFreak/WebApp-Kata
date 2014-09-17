var mongoose = require("mongoose");
var superagent = require("superagent");
var expect = require("expect.js");
var app = require("../server.js");

describe('Checking Express RESTful api server,',function(){
    var _id='',_title='first News',_description='None',_createdate='';

    it('post a new news',function(done){
        superagent.post('http://localhost:8080/api/news/')
            .send({
                news:{
                    title : _title,
                    description: _description
                }
            })
            .end(function(e,res){
                expect(e).to.eql(null);
                expect(res.body.news).to.be.an('object');
                expect(res.body.news.title).to.eql(_title);
                expect(res.body.news.description).to.eql(_description);
                expect(res.body.news._id.length).to.eql(24);
                done();
                _id = res.body.news._id;
            });
    });

    it('retrieves one news info',function(done){
        superagent.get('http://localhost:8080/api/news/'+_id)
            .end(function(e,res){
                expect(e).to.eql(null);
                expect(res.body.news).to.be.an('object');
                expect(res.body.news.title).to.eql(_title);
                expect(res.body.news.description).to.eql(_description);
                expect(res.body.news._id.length).to.eql(24);
                done();
            });
    });

    it('retrives all news info',function(done){
        superagent.get('http://localhost:8080/api/news')
            .end(function(e,res){
                expect(e).to.eql(null);
                expect(res.body.news.length).to.be.above(0);
                expect(res.body.news.map(function(item){
                    return item.title;
                })).to.contain(_title);
                done();
            });
    });

    it('updates a news info',function(done){
        superagent.put('http://localhost:8080/api/news/'+_id)
            .send({
                news: {
                    description: 'Modify news description'
                }
            })
            .end(function(e,res){
                expect(e).to.eql(null);
                expect(res.status).to.eql(200);
                done();
            });
    });

    it('check news info after update',function(done){
        superagent.get('http://localhost:8080/api/news/'+_id)
            .end(function(e,res){
                expect(e).to.eql(null);
                expect(res.body.news).to.be.an('object');
                expect(res.body.news._id.length).to.eql(24);
                expect(res.body.news.title).to.eql(_title);
                expect(res.body.news.description).not.to.eql(_description);
                done();
            });
    });
    it('remove a news',function(done){
        superagent.del('http://localhost:8080/api/news/'+_id)
            .end(function(e,res){
                expect(e).to.eql(null);
                expect(res.status).to.eql(200);
                done();
            });
    });
});
