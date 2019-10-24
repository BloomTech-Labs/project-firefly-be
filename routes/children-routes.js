const router = require('express').Router(); 

const Children = require('../models/children-routes.js'); 

// Get all children profiles
router.get('/', (req, res) => {
    Children.find()
	.then(child => res.status(200).json(child))
	.catch(err => err.status(500).json(res))
}

// get specific children 
router.get('/:_id', (req, res) => {
    const { _id } = req.params; 

    Users.findById({ _id })
	.then(child => res.status(200).json(user))
	.catch(err => res.status(500).json(err))
}

// add new child profile 	
router.post('/', (req, res) => {
    const child = new Children({
	name: blahblah
    })

    child.save()
	.then(newChild => res.status(201).json(newUser))
	.catch(err => res.status(500).json(err)); 
}

// update existing child profile
router.put'/:_id', (req, res) => {
    const { _id } = req.params; 
    const changes = req.body; 

    Children.findByIdAndUpdate(_id, changes)
	.then(updatedChild => res.status(200).json(updatedChild))
	.catch(err => res.status(500).json(err)
}

// delete existing child profile 
router.delete('/:_id', (req, res) => {
    const { _id } = req.params; 

    Children.findByIdandDelete(_id)
	.then(deletedChild => res.status(200).json(deletedChild))
	.catch(err => res.status(500).json(err)); 
}

module.exports = router; 
