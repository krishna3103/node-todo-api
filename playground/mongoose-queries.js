const {ObjectID} 	= require('mongodb');
const {mongoose} 	= require('./../server/db/mongoose');
const {Todo} 		= require('./../server/models/todo');
const {User} 		= require('./../server/models/user')

/*
var id = '5b5b5bf03bfd91214fd22887';
var param = {_id : id};

Todo.find(param).then((todos) => {
	console.log('todos =>',todos);
});

Todo.findOne(param).then((todo) => {
	console.log('todo ===>', todo);
})

Todo.findById(id).then((todo) => {
	console.log('todo ==', todo);
})
*/

var id = '5b5c44c5c423b7264f83e898';
var param = {_id : id};

if(!ObjectID.isValid(id)){
	console.log('ID is not valid.');
}

User.find(param).then((users) => {
	console.log('Users =>',JSON.stringify(users, undefined,2));
});

User.findOne(param).then((user) => {
	if (!user) {
		return console.log('User is not exists.');
	}
	console.log('User ===>',JSON.stringify(user, undefined,2));
})

User.findById(id).then((user) => {
	if (!user) {
		return console.log('User id is not exists.');
	}
	console.log('User ==',JSON.stringify(user, undefined,2));
}, (e) => {
	console.log(e);
});