const router = require('express').Router();

const Users = require('../models/users');
const Children = require('../models/children');
const mw = require('../middleware/users-middleware');

//Get ALL users
router.get('/', (req, res) => {
  Users.find()
  .then(users => res.status(200).json(users))
  .catch(err => res.status(500).json({ error: err }));
});

//Get specific user
router.get('/:_id', mw.validateUserId, (req, res) => {
  const { _id } = req.params;

  Users.findById(_id)
  .then(user => res.status(200).json(user))
  .catch(err => res.status(500).json({ error: err }));
});

//Get specific user with children
router.get('/:_id/children', (req, res) => {
  const { _id } = req.params;

  Users.findById(_id)
  .then(user => {
    Children.find({ parent_id: _id }).select('-parent_id -__v')
    .then(children => {
      user._doc.children = children;
      res.status(200).json(user);
    })
    .catch(err => res.status(500).json({ error: err }));
  })
  .catch(err => res.status(500).json({ error: err }));
});

//Add new user
router.post('/', mw.checkUserObj, mw.validateUniqueEmail, (req, res) => {
  const user = new Users({
    //body structure for created user
    email: req.body.email,
    password: req.body.password,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    phone_number: req.body.phone_number || null,
    academic_research: req.body.academic_research || false,
    parent_age: req.body.parent_age || null,
    marital_status: req.body.marital_status || null,
    relation_to_child: req.body.relation_to_child || null,
    education: req.body.education || null,
    address: req.body.address || null,
    city: req.body.city || null,
    state: req.body.state || null,
    country: req.body.country || null,
    zip: req.body.zip || null
  });

  user.save()
  .then(newUser => res.status(201).json(newUser))
  .catch(err => res.status(500).json({ error: err }));
});

//Update existing user
router.put('/:_id', mw.validateUserId, mw.validateUniqueEmail, (req, res) => {
  const { _id } = req.params;
  const changes = req.body;

  Users.findByIdAndUpdate(_id, changes)
  .then(ogUserObj => {
    Users.findById(_id)
      .then(updatedUser => res.status(202).json(updatedUser))
      .catch(err => res.status(500).json({ error: err }))
  })
  .catch(err => res.status(500).json({ error: err }));
});

//Delete existing user
router.delete('/:_id', mw.validateUserId, (req, res) => {
  const { _id } = req.params;

  Users.findByIdAndDelete(_id)
  .then(deletedUser => res.status(200).json(deletedUser))
  .catch(err => res.status(500).json({ error: err }));
});

module.exports = router;