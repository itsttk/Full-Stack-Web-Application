const request = require('request');

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

module.exports.getData = getData;