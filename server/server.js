const _ 			= require('lodash');
const express 		= require('express');
const bodyParser 	= require('body-parser');
const {ObjectID}  	= require('mongodb');

var {mongoose} 	= require('./db/mongoose');
var {Todo} 		= require('./models/todo');
var {User} 		= require('./models/user');
var {authenticate} = require('./middleware/authenticate');


var app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', authenticate, (req,res) => {

	var todo = new Todo({
		text : req.body.text,
		_creator: req.user._id,
		completed : req.body.completed,
		completedAt : req.body.completedAt
	});

	todo.save().then((doc) => {
		res.send(doc);
	}, (e) => {
		res.status(404).send(e);
	});

});

app.get('/todos', authenticate, (req,res) =>{
	Todo.find({
		_creator: req.user._id
	}).then((todos) =>{
		res.send({todos});
	}, (e) => {
		res.status(404).send(e);
	});
});

//GET /todos/12345
app.get('/todos/:id', authenticate, (req,res) => {
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

	Todo.findOne({
		_id:id,
		_creator:req.user._id
	}).then((todo) => {
		if(!todo){
			return res.status(404).send();
		}
		res.send(todo);
	}).catch((e) => {
		res.status(400).send(e);
	});

});

//DELETE /todos/:id
app.delete('/todos/:id', authenticate, (req, res) => {

	var id = req.params.id;

	if(!ObjectID.isValid(id)) {
		return res.status(404).send();
	}

	Todo.findOneAndRemove({
		_id: id,
		_creator: req.user._id
	}).then((todo) => {
		if(!todo) {
			return res.status(404).send();
		}
		res.send(todo);
	}).catch((e) =>{
		return res.satus(400).send();
	});

});

//UPDATE /todos/:id

app.patch('/todos/:id', authenticate, (req, res) => {

	var id = req.params.id;
	var body = _.pick(req.body, ['text','completed']);

	if(!ObjectID.isValid(id)){
		return res.status(404).send();
	}

	if(_.isBoolean(body.completed) && body.completed){
		body.completedAt = new Date().getTime();
	} else {
		body.completed = false;
		body.completedAt = null;
	}

	Todo.findOneAndUpdate({_id:id,_creator:req.user._id}, {$set: body}, {new: true}).then((todo) => {
		if(!todo){
			return res.status(404).send();
		}

		res.send({todo});
	}).catch((e) => {
		res.status(400).send();
	})
});


//POST USERS
app.post('/users',(req, res) => {
	var body = _.pick(req.body, ['email','password']);
	var user = new User(body);

	user.save().then((doc) => {
		return user.generateAuthToken();
	}).then((token) => {
		res.header('x-auth',token).send(user);
	}).catch((e) => {
		res.status(400).send(e);
	});

});

//Check user middleware

app.get('/users/me', authenticate, (req, res) => {
	res.send(req.user);
});


//POST /users/login {email,password}
app.post('/users/login', (req, res) => {
	var body = _.pick(req.body, ['email','password']);

	User.findByCredentials(body.email,body.password).then((user) => {
		return user.generateAuthToken().then((token) => {
			res.header('x-auth',token).send(user);
		});
	}).catch((e) => {
		res.status(400).send();
	});
});

//DELETE /users/me/token
app.delete('/users/me/token', authenticate, (req, res) => {

	req.user.removeToken(req.token).then(() => {
		res.status(200).send();
	}, () => {
		res.status(400).send();
	});
})


app.listen(port, () => {
	console.log('server is running on port ',port);
});