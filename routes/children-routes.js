const router = require('express').Router(); 

const Children = require('../models/children');
const Firefly = require('../models/fireflies')
const mw = require('../middleware/children-middleware')

// Get all children profiles
router.get('/', (req, res) => {
    Children.find()
	.then(child => res.status(200).json(child))
	.catch(err => err.status(500).json(res))
})

// get specific children 
router.get('/:_id', mw.validateChildId, (req, res) => {
    const { _id } = req.params; 

    Children.findById({ _id })
	.then(child => res.status(200).json(child))
	.catch(err => res.status(500).json(err))
})

//Get specific child with fireflies
router.get('/:_id/fireflies', (req, res) => {
    const { _id } = req.params;
  
    Children.findById(_id)
    .then(child => {
      Firefly.find({ child_id: _id }).select('-child_id -__v')
      .then(fireflies => {
        child._doc.fireflies = fireflies;
        res.status(200).json(child);
      })
      .catch(err => res.status(500).json({ error: err }));
    })
    .catch(err => res.status(500).json({ error: err }));
  });

// add new child profile 	
router.post('/', mw.checkChildObj, mw.validateParentId, (req, res) => {
    const child = new Children({
        parent_id: req.body.parent_id,
        child_name: req.body.child_name,
        child_age: req.body.child_age || null,
        grade: req.body.grade || null
    })

    child.save()
	.then(newChild => res.status(201).json(newChild))
	.catch(err => res.status(500).json(err)); 
})

// update existing child profile
router.put('/:_id', mw.validateChildId, mw.checkChildObj, mw.validateParentId, (req, res) => {
    const { _id } = req.params; 
    const changes = req.body; 

    Children.findByIdAndUpdate(_id, changes)
    .then(ogChildObj => {
        Children.findById(_id)
            .then(updatedChild => res.status(202).json(updatedChild))
            .catch(err => res.status(500).json(err))
        })
	.catch(err => res.status(500).json(err))
})

// delete existing child profile 
router.delete('/:_id', mw.validateChildId, (req, res) => {
    const { _id } = req.params; 

    Children.findByIdAndDelete(_id)
	.then(deletedChild => res.status(200).json(deletedChild))
	.catch(err => res.status(500).json(err)); 
})

module.exports = router; 
