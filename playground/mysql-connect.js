const mysql = require('mysql');

var con = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : '',
	database : 'muscle_blaze'
});

con.connect((err) => {
	if(err){
		return console.log('Unable to connect mysql : ',err);
	}

	console.log('connected to mysql server')

	var query = 'INSERT INTO upload_data VALUE ("","Krishna Gupta","krishna.kkg@gmail.com","my story","10.09.210.22","")';
	con.query(query, (err, result) => {
		if(err){
			return console.log('Not abale to fetch data');
		}
		console.log("1 record inserted");
		console.log(JSON.stringify(result,undefined,2));
	});
});