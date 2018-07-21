const {MongoClient,ObjectID} = require('mongodb');
// Connection url
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'TodoApp';
// Connect using MongoClient
MongoClient.connect(url,{useNewUrlParser :true}, (err, client) => {
	if(err){
		return console.log('Unable to connect MongoDB Server');
	}

	console.log('Connected to MongoDB Server');

	//Create a collection we want to drop later
	const col = client.db(dbName);

	var filter = { _id : new ObjectID('5b4b3319fde4574611321f25') };
	var update = {
		$set : {
			name : 'Krishna',
			age : 29,
			location : 'Dahisar'
		}
	};
	col.collection('Users').findOneAndUpdate(filter,update,{returnOriginal:false}).then((result) => {
		console.log(result);
	});
});
