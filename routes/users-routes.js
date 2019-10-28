const router = require('express').Router();

const Users = require('../models/users');
const mw = require('../middleware/users-middleware')

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

//Add new user
router.post('/', mw.checkUserObj, mw.validateUniqueEmail, (req, res) => {
  const user = new Users({
    //body structure for created user
    first_name: req.body.first_name || null,
    last_name: req.body.last_name || null,
    email: req.body.email,
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
router.put('/:_id', mw.validateUserId, mw.checkUserObj, mw.validateUniqueEmail, (req, res) => {
  const { _id } = req.params;
  const changes = req.body;

  Users.findByIdAndUpdate(_id, changes)
  .then(updatedUser => res.status(200).json(updatedUser))
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