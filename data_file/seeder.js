var user = require('../models/schema');
const data = require('./data.js');
const request = require('request');

var mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/data');

var db = mongoose.connection;
var Schema = mongoose.Schema;


db.on('error', console.error.bind(console, 'Connection error'));
db.on('open', function(callback) {
	console.log('Connected to database.');
});


var employeSchema = new Schema({
			name: String,
			image_url: String,
			title: String,
			bio:String,
			user: Array,
			count:0
	});



var employe = mongoose.model("employe", employeSchema);



exports.loadData = function(cb){

	data.getData((error, results)=>{
	if (error) {cb(error,null);}
	
	else{

		var count = results.length;

		for (const x of results) {
			employe.find(x, function (err, docs) {
				if(err) console.log('cannot add');
				else if(docs.length>0){}//console.log('already there');}
				else{
					var employe1= new employe({
				     name:x.name,
				     image_url:x.image_url,
				     title:x.title,
				     bio:x.bio,
				   //  user:[],
				     count:0
				 	});
				 	employe1.save();
				}

			});
		//console.log("Load Step 1");
   		}

   		cb(null,'success');
	}

});

}

module.exports.employe = employe;


