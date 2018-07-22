var mongoose = require('mongoose');

var Todo = mongoose.model('todos', {
	list : {
		type : String,
		require : true,
		trim : true,
		minlength : 1
	},
	completed : {
		type : Boolean,
		default : false
	},
	completedAt : {
		type : Number,
		default : null
	}
});

module.exports = { Todo : Todo};