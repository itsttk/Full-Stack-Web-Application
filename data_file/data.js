//get request module 
const request = require('request');

//get data from api
var getData = ( callback )=>{

	request({
		url:'https://api.myjson.com/bins/16roa3',
		json:true
	},(error,response,body)=>{

		if(error){
			callback('unable to connect to servers');
		}
		else if(response.statusCode===200){
		callback(undefined,body);
		}
	});

}

//export getData to use in other files
module.exports.getData = getData;