const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const mongoose = require('mongoose');
const http = require('http');
const bodyParser = require('body-parser');


//var user = require('./models/schema.js');
const data = require('./data_file/data.js');
const seeder = require('./data_file/seeder.js');


const port = process.env.PORT || 3000;

var app = express();


hbs.registerPartials(__dirname+'/views/partials');
app.set('view-engine', 'hbs');


app.use (express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true })); 

mongoose.connect('mongodb://localhost:27017/data');

var db = mongoose.connection;
var Schema = mongoose.Schema;

db.on('error', console.error.bind(console, 'Connection error'));
db.on('open', function(callback) {
  console.log('Connected to database.');
});



app.get('/', (req, res)=>{

	seeder.loadData(function(err, data){
		if(err){
			console.log('Error getting data');
		} 
		else {
			console.log('step1');
		    seeder.employe.find({}, function (err, docs) {

			    if(err){console.log('error');}  

			    else{

			    	var helper = [];
			    	var doclength = docs.length;
			    	helper.length = doclength;

				    for (var i = 0; i < doclength; i++) {
				      var y = new Set(docs[i].user).size
				      var obj = {count:y,_id:docs[i]._id, name:docs[i].name, image_url:docs[i].image_url,bio:docs[i].bio, title:docs[i].title};
				      helper.push(obj);
				          console.log('step3');
				    }
			        console.log('step4');

			    
				    res.render('home.hbs', {
				    welcome: helper
				    });

			    }

		    });

		}
	});
    
   

});

//post user form and return user

app.post('/user', function(req, res) {

	var temp = req.body.name;
	seeder.employe.findOneAndUpdate(

    	{ _id: req.body.id }, 
     	{ $push: { user: temp  } },
      	function (error, success) {
    	
    	if(error){console.log(error);} 

    	else {

    		seeder.employe.find({}, function (err, docs) {
				if(err){console.log('error');}  

  				else{

 					var flag = [];
   					var doclength = docs.length;
    				flag.length = doclength;

				    for (var i = 0; i < doclength; i++) {
				    var z = new Set(docs[i].user).size
				    var obj = {count:z,_id:docs[i]._id, name:docs[i].name, image_url:docs[i].image_url,bio:docs[i].bio, title:docs[i].title,temp:docs[i].user.includes(req.body.name)};
				    flag.push(obj);
				    }

				    res.render('user.hbs', {
				    welcome: flag   
				    });

  				}

				});
   		}
    });
  
});


app.listen(port,()=>{
  console.log(`server is up and running ${port}`);
});