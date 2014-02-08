var model_path = '../models/',models={};

function getModel(name){
    if (!(name in models))
        models[name] = require(model_path + name);

    return models[name];
}
exports.findAll = function(req,res,next){
    var container = req.params.container;
    var model = getModel(container);

	model.find(function(err,objs){
		res.send({container:objs});
	});
};

exports.findByID = function(req,res,next){
    var container = req.params.container;

	model.findOne({_id:req.params.id},function(err,obj){
		res.send({container:obj});
	});
};

exports.post = function(req,res){
    var book = new Book(req.body.book);

	book.save(function(err,book){
		res.send({book:book});
	});
};

exports.updates = function(req,res,next){
	Book.update(
        {_id:req.params.id},
        {$set:req.body.book},
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
