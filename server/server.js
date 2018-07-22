var express 	= require('express');
var bodyParser 	= require('body-parser');


var {mongoose} 	= require('./db/mongoose');
var {Todo} 		= require('./models/todo');
var {User} 		= require('./models/user');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req,res) => {

	//console.log(req.body.text);

	var todo = new Todo({
		list : req.body.list,
		completed : req.body.completed,
		completedAt : req.body.completedAt
	});

	todo.save().then((doc) => {
		res.send(doc);
	}, (e) => {
		res.status(404).send(e);
	});

});

app.listen('3000', () => {
	console.log('server is running on port 3000');
});