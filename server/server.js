const _ 			= require('lodash');
const express 		= require('express');
const bodyParser 	= require('body-parser');
const {ObjectID}  	= require('mongodb');

var {mongoose} 	= require('./db/mongoose');
var {Todo} 		= require('./models/todo');
var {User} 		= require('./models/user');

var app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req,res) => {

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

app.get('/todos', (req,res) =>{
	Todo.find().then((todos) =>{
		res.send({todos});
	}, (e) => {
		res.status(404).send(e);
	});
});

//GET /todos/12345
app.get('/todos/:id', (req,res) => {
	var id = req.params.id;

	//valid id using isValid
		//404 send back empty send
	if(!ObjectID.isValid(id)) {
		return res.status(404).send();
	}

	//findbyid
		//success
			//if todo send it back
			//if not  todo -404 send empty body
		//erro
			//400 - send empty body back

	Todo.findById(id).then((todo) => {
		if(!todo){
			return res.status(404).send();
		}
		res.send(todo);
	}).catch((e) => {
		res.status(400).send(e);
	});

});

//DELETE /todos/:id
app.delete('/todos/:id', (req, res) => {

	var id = req.params.id;

	if(!ObjectID.isValid(id)) {
		return res.status(404).send();
	}

	Todo.findByIdAndRemove(id).then((todo) => {
		if(!todo) {
			return res.status(404).send();
		}
		res.send(todo);
	}).catch((e) =>{
		return res.satus(400).send();
	});

});

//UPDATE /todos/:id

app.patch('/todos/:id', (req, res) => {

	var id = req.params.id;
	var body = _.pick(req.body, ['list','completed']);

	if(!ObjectID.isValid(id)){
		return res.status(404).send();
	}

	if(_.isBoolean(body.completed) && body.completed){
		body.completedAt = new Date().getTime();
	} else {
		body.completed = false;
		body.completedAt = null;
	}

	Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
		if(!todo){
			return res.status(404).send();
		}

		res.send({todo});
	}).catch((e) => {
		res.status(400).send();
	})
});

app.listen(port, () => {
	console.log('server is running on port ',port);
});