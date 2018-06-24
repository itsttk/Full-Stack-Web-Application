//this code helps in storing data we got from api into mongodb database 

//requiring npm packages
const request = require('request');
const mongoose = require('mongoose');

//requiring own files
const data = require('./data.js');

//connet to mongodb 
mongoose.connect('mongodb://localhost:27017/data');
var db = mongoose.connection;
var Schema = mongoose.Schema;



// test code to check db connection (for testing purposes)
// db.on('error', console.error.bind(console, 'Connection error'));
// db.on('open', function(callback) {
// 	console.log('Connected to database.');
// });



//create schema and model constructor for employee
var employeSchema = new Schema({
			name: String,
			image_url: String,
			title: String,
			bio:String,
			user: Array,
			count:0
	});
var employe = mongoose.model("employe", employeSchema);


//get data from api and store it to mongodb
exports.loadData = function(cb){

	data.getData((error, results)=>{
	if (error) {cb(error,null);}
	
	else{

		var count = results.length;

		for (const x of results) {
			employe.find(x, function (err, docs) {
				if(err) console.log('cannot add');
				else if(docs.length>0){}//console.log('already there');
				else{
					var employe1= new employe({
				     name:x.name,
				     image_url:x.image_url,
				     title:x.title,
				     bio:x.bio,
				     count:0
				 	});
				 	employe1.save();
				}

			});
   		}

   		cb(null,'success');
	}

});

}

//export employe to use in other files
module.exports.employe = employe;




