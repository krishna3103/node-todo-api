const {ObjectID} 	= require('mongodb');
const {mongoose} 	= require('./../server/db/mongoose');
const {Todo} 		= require('./../server/models/todo');
const {User} 		= require('./../server/models/user')

// Todo.remove({}).then((result) => {
// 	console.log(result);
// });

Todo.findOneAndRemove({_id:'5b5dfd5a46e4e12f2be81f72'}).then((todo) => {
	console.log(todo);
});
