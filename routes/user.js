
/*
 * GET users listing.
 */
var mongoose = require("mongoose");

mongoose.connect('mongodb://localhost/test');

var Book = mongoose.model('Books',{title:String,description:String});

exports.list = function(req, res){
  var aBook = new Book({title:"A Book",description:"None"});
  aBook.save(function(err){
  	if (err)
  		res.send("Error");
	});
  res.send(aBook);
  res.send("respond with a resource");
};
