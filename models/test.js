// THIS FILE IS JUST AN EXAMPLE OF A MONGOOSE MODEL. IT IS NOT ACTUALLY USED ANYWHERE IN THE APPLICATION

const mongoose = require('mongoose'); 

const productSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId, 
	name: String,
	price: Number
})

// first argument here is what you want to name the model, second is the schema you want to confine it to
module.exports = mongoose.model('Product', productSchema)
