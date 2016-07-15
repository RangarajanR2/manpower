var express = require("express");
var bodyParser = require('body-parser');
var app = express();
var fs= require('fs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.get('/index.html',function(req,res){
	res.sendFile(__dirname+'/index.html');
});
app.get('/styles.css',function(req,res){
	res.sendFile(__dirname+'/styles.css');
});
app.get('/angular.min.js',function(req,res){
	res.sendFile(__dirname+'/scripts/angular.min.js');
});
app.get('/app.js',function(req,res){
	res.sendFile(__dirname+'/scripts/app.js');
});
app.get('/*/customerControl.js',function(req,res){
	res.sendFile(__dirname+'/controllers/customerControl.js');
});
app.get('*/customers.json',function(req,res){
	res.sendFile(__dirname+'/db/customers.json');
});
app.get('/upload.html',function(req,res){
	console.log('getting app');
	res.sendFile(__dirname+'/upload.html');
});

app.get('/test.atm',function (req , res) {
	fs.readFile("db/customers.json",function(err,data){
		console.log('file Read');
		if(!err){
			console.log('no error');
			console.log(JSON.parse(data));

			res.end((JSON.parse(data)["1"].name));
		}
		else{
			console.log('err');
		}
	});
	
})
app.post('/delete',function(req,res){
	console.log('delete request');
	var idArray = req.body.id;
	fs.readFile("db/customers.json",function(err,data){
		if(!err){
			var data = JSON.parse(data);
			for (var j = 0; j < idArray.length; j++) {
				for (var i = data.length - 1; i >= 0; i--) {
				if(parseInt(data[i].uniqID) == idArray[j]){
					//delete data[i];  // creates null value in json and causes ngrepeat to fail
					data.splice(i,1);
				}
			}
			}
			console.log(data);
			fs.writeFile('db/customers.json',JSON.stringify(data),{flag:'w'},function(err){
				if(err){
					console.log('err');
				}
				else{
					console.log('succcess... Redirecting');
					res.end();
				}
			});
		}
		else{
			console.log('err');
		}
	});
});
app.post('/postdata',function(req,res){
console.log('success');
var body = req.body;

fs.readFile("db/customers.json",function(err,data){
	console.log('db file Read');
	if(!err){
		console.log('no error');
		var data = JSON.parse(data);
		console.log(((data).length));
		data = constructJson(data,body);
		console.log(data);

		console.log('going to write');
		fs.writeFile('db/customers.json',JSON.stringify(data),{flag:'w'},function(err){
			if(err){
				console.log('err');
			}
			else{
				console.log('succcess... Redirecting');
				res.redirect('/index.html');
				res.end();
			}
		});

		console.log(data[0].name);
		//console.log(data);
		//res.end((JSON.parse(data)["1"].name));
	}
	else{
		console.log('err');
	}
});
//res.send('success');

});

function constructJson(data,body){
		var i = data.length;
		data[i]={};
		data[i].uniqID = parseInt(data[i-1].uniqID)+1;
		data[i].toShow = true;
		data[i].name = body.name;
		data[i].profession = body.prf;
		data[i].city = body.city;
		data[i].ph = body.ph;
		data[i].currentStatus = body.status || "free";

	return data;
	/*return '{"name:"'+a+',"profession:"'+b+'"}'*/
}
app.post('/users/upload',function(req,res){
	var body = req.body;
	console.log("upload received");
	console.log(body.name);
	console.log(body.prf);
	/**/
});
var server = app.listen(8081 , function(){
	console.log("server running");
})