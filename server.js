const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();


hbs.registerPartials(__dirname+'/views/partials');
app.set('view-engine', 'hbs');


app.use((req, res, next)=>{

	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;

	console.log(log);

	fs.appendFile('server.log', log + '\n' , (err)=>{

		if(err){
			console.log('unable to append file');		}

	});

	next();

});

// app.use((req,res,next)=>{

// 	res.render('maintain.hbs');

// });

app.use (express.static(__dirname + '/public'));


hbs.registerHelper('getCurrentYear',()=>{
	return new Date().getFullYear()
});

hbs.registerHelper('screamIT',(text)=>{
	return text.toUpperCase();
});

app.get('/', (req, res)=>{

	res.render('home.hbs', {
	title: 'welcome page',
   	welcome: 'welcome to my page'


	});


});

app.get('/about',(req,res)=>{

   res.render('about.hbs',{
   	title: 'About page',
   });
});


app.get('/bad',(req,res)=>{

	res.send({
		errorMessage: 'unable to handle request'
	});

});


app.listen(port,()=>{
	console.log(`server is up and running ${port}`);
});