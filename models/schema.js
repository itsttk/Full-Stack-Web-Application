const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
	
	name: {type:String, required: true},
	image_url: {type:String, required: true},
	title: {type:String, required: true},
	bio: {type:String, required: true},
	count: {type:Number, required: true}

	});


module.exports = mongoose.model('user',schema);


