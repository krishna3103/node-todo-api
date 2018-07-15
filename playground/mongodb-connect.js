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
	//const col = client.db(dbName).collection('Todos');
	// col.insert({
	// 	text : 'MongoDB Tutorials',
	// 	completed : true
	// }, (err, result) => {
	// 	if(err){
	// 		return console.log('Unable to insert into Todos');
	// 	}
	// 	console.log(JSON.stringify(result.ops, undefined, 2));

	// });

	// const col =  client.db(dbName).collection('Users');
	// col.insert({
	// 	name : 'Krishna Gupta',
	// 	age : 29,
	// 	location : 'Dahisar, Mumbai'
	// }, (err, result) => {
	// 	if(err){
	// 		return console.log('Unable to insert into Users',err);
	// 	}

	// 	console.log(JSON.stringify(result.ops, undefined, 2) );
	// });

	// col.find({
	// 	_id: new ObjectID('5b4b0e0991f82d464f1d7d7c')
	// }).toArray().then((docs) => {
	// 	console.log('Todos');
	// 	console.log(JSON.stringify(docs,undefined,2));
	// }, (err) => {
	// 	console.log('Unable to fetch todos', err);
	// });

	// col.find().count().then((cnt) => {
	// 	console.log('Todos count :',cnt);
	// }, (err) => {
	// 	console.log('Unable to fetch todos', err);
	// });

	const users = client.db(dbName).collection('Users');
	users.find({
		location:'Mumbai'
	}).toArray().then((docs) => {
		console.log('Users Documents');
		console.log(JSON.stringify(docs,undefined,2));
	}, (err) => {
		console.log('Unable to fetch data from Users');
	});


	client.close();
});