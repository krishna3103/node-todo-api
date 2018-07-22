var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connection url
const url = 'mongodb://localhost:27017/';
// Database Name
const dbName = 'TodoApp';
mongoose.connect(url+dbName,{ useNewUrlParser: true }, (err,client) => {
	if(err){
		return console.log('Unable to connect MongoDB Server');
	}
	console.log('Connected to MongoDB Server');
});

module.exports = {
	mongoose : mongoose
};