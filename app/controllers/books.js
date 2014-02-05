var Book = require('../models/book.js');

exports.findAll = function(req,res,next){
	Book.find(function(err,books){
		res.send({book:books});
	});
};

exports.findByID = function(req,res,next){
	Book.findOne({_id:req.params.id},function(err,book){
		res.send({book:book});
	});
};

exports.post = function(req,res){
	var book = new Book(
        {
            title:req.body.book.title,
            isbn:req.body.book.isbn,
            description:req.body.book.description
        }
    );
	book.save(function(err,book){
		res.send({book:book});
	});
};

exports.updates = function(req,res,next){
	Book.update(
        {_id:req.params.id},
        {$set:{description:req.body.book.description}},
            function(err,numberAffected,raw){
            if (err)
                console.log(err);
            res.send(200);
	    });
};

exports.removeByID = function(req,res,next){
	Book.remove({_id:req.params.id},function(err){
		if (err)
			next(err);
        res.send(200);
	});
};
