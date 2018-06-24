//requiring npm packages
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const mongoose = require('mongoose');
const http = require('http');
const bodyParser = require('body-parser');

//requiring own files
const data = require('./data_file/data.js');
const seeder = require('./data_file/seeder.js');

//use port 3000 unless there exists a preconfigured port
const port = process.env.PORT || 3000;

//create express application
var app = express();

//register handlebars partials and set view-engine
hbs.registerPartials(__dirname+'/views/partials');
app.set('view-engine', 'hbs');

//middleware for accessing static files and http request
app.use (express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true })); 

//this method creates all incoming requests from client to server.log file
app.use((req, res, next)=>{

	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;

	fs.appendFile('server.log', log + '\n' , (err)=>{
		if(err){
			console.log('unable to append file');
	 	}

	});

	next();

});
 

//render '/' starting page as client request made
app.get('/', (req, res)=>{

	seeder.loadData(function(err, data){
		if(err){
			console.log('Error getting data');
		} 
		else {

			//get data from database and render on frontend
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
				    }

				    res.render('home.hbs', {
				    welcome: helper
				    });

			    }

		    });

		}
	});
    
   

});


//get client post request and then redirect to /user 
app.post('/user', function(req, res) {

	var temp = req.body.name;

	//update database with data(email) from the form
	seeder.employe.findOneAndUpdate(

    	{ _id: req.body.id }, 
     	{ $push: { user: temp  } },
      	function (error, success) {
    	
    	if(error){console.log(error);} 

    	else {

    		//render after updating the page
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
  //console.log(`server is up and running ${port}`);
});