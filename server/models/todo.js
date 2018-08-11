var mongoose = require('mongoose');

var Todo = mongoose.model('todos', {
	text : {
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
	},
	_creator: {
		type: mongoose.Schema.Types.ObjectId,
		require: true
	}
});

module.exports = { Todo : Todo};