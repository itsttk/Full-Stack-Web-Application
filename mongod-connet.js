const MongoClient = require('mongodb').MongoClient;
const data = require('./data_file/data.js');




MongoClient.connect('mongodb://localhost:27017/db', (err, client) => {
  if (err) {
    return console.log('unable to connect');
  }
  console.log('connected to mongodb server');

  const db = client.db('db');

  db.collection('User').find().toArray().then((docs)=>{

  	console.log('db');
  	console.log(JSON.stringify(docs,undefined,2));

  },(err)=>{
       console.log("unable to fetch",err);
  });



  



  // db.collection('mydb').insertOne({
  // 	key: 'some random text',
  // 	value: false
  // },(err,result)=>{

  // 	if(err){
  // 		console.log('unable to inser into mydb');
  // 	}

  // 	console.log(JSON.stringify(result.ops,undefined,2));

  // });



  //insert new doc into users

  // db.collection('User').insertOne({
  // 	name: 'ttk',
  // 	age: '25',
  // 	location : 'dallas'
  // },(err,result)=>{

  // 	if(err){
  // 		return console.log('unable to add user', err);
  // 	}

  // 	console.log(result.ops[0]._id.getTimestamp());

  // });


   client.close();
});
