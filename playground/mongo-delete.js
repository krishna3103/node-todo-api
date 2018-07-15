const {MongoClient,ObjectID} = require('mongodb');
// Connection url
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'TodoApp';
// Connect using MongoClient
MongoClient.connect(url,{ useNewUrlParser: true }, (err, client) => {

	if(err){
		return console.log('Unable to connect MongoDB Server');
	}

	console.log('Connected to MongoDB Server');

	//Create a collection we want to drop later
	const col = client.db(dbName);

	var query = {location:'Mumbai'};
	// col.collection('Users').deleteMany(query,(err,result) => {
	// 	if(err){
	// 		return console.log('Unable to fetch data',err);
	// 	}
	// 	console.log('Users Documents');
	// 	console.log(result.result);
	// });

	//findOneAndDelete command
	col.collection('Users').findOneAndDelete(query, (err, result) => {
		if(err){
			return console.log('Unable to delete');
		}

		console.log(result);
	})

	client.close();
});