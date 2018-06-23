const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var mongoose = require('mongoose');
const http = require('http');

//var user = require('./models/schema.js');
const data = require('./data_file/data.js');
const seeder = require('./data_file/seeder.js');


const port = process.env.PORT || 3000;

var app = express();


hbs.registerPartials(__dirname+'/views/partials');
app.set('view-engine', 'hbs');

app.use (express.static(__dirname + '/public'));


mongoose.connect('mongodb://localhost:27017/data');

var db = mongoose.connection;
var Schema = mongoose.Schema;


db.on('error', console.error.bind(console, 'Connection error'));
db.on('open', function(callback) {
	console.log('Connected to database.');
});

// var employeSchema = new Schema({
// 			name: String,
// 			image_url: String,
// 			title: String,
// 			bio:String,
// 			count:0
// 	});

// var employe = mongoose.model("employe", employeSchema);


// data.getData((error, results)=>{

// 	if (error) {console.log(error);}
// 	else{

// 	var count = results.length;

// 	for (var i = 0; i < count; i++) {
// 	 	var employe1 = new employe({
// 	     name: results[i].name,
// 	     image_url: results[i].image_url,
// 	     title: results[i].title,
// 	     bio:results[i].bio,
// 	     count:0
// 	 	});

// 	console.log('added'); 	

//   	employe1.save();	

//   }

//   //mongoose.connection.close()


// }

// });




app.get('/', (req, res)=>{

    seeder.loadData();

    seeder.employe.find({}, function (err, docs) {

	if(err){console.log('error');}	


	else{
	res.render('home.hbs', {
		welcome: docs
		});
	}


	});


	



});











app.listen(port,()=>{
	console.log(`server is up and running ${port}`);
});