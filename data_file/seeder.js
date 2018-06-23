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
			count:0
	});



var employe = mongoose.model("employe", employeSchema);




function loadData() { data.getData((error, results)=>{



	if (error) {console.log(error);}
	else{

	var count = results.length;

	for (const x of results) {


		employe.find(x, function (err, docs) {

		console.log(x.name);


			if(err) console.log('cannot add');

			else if(docs.length>0){console.log('already there');}

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


       


	// //employe1.save();

	// apidata.add(employe1);

	// console.log(apidata[7]);

   }

}

});}



//console.log(y);

// function f (){



// }



module.exports.loadData = loadData;
module.exports.employe = employe;


