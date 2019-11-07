const mongoose = require('mongoose'); 

// creating schema for children collections
const childrenSchema = new mongoose.Schema({
	parent_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
	child_name: { type:String, required: true },
	child_age: Number,
	grade: String
}); 

const Children = new mongoose.model('Children', childrenSchema);

module.exports = Children
