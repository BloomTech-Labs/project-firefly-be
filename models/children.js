const mongoose = require('mongoose'); 

// creating schema for children collections
const childrenSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	parent_id: { type: Schema.Types.ObjectId, ref: 'Users' },
	child_name: String,
	child_age: Number,
	grade: String
}); 

module.exports = mongoose.model('Children', childrenSchema); 
