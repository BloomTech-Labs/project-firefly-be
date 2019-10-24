const router = require('express').Router();

const Users = require('../models/users');

//Get ALL users
router.get('/', (req, res) => {
  Users.find()
    .then(users => res.status(200).json(users))
    .catch(err => res.status(500).json({ error: err }));
});

//Get specific user
router.get('/:_id', (req, res) => {
  const { _id } = req.params;

  Users.findById(_id)
    .then(user => res.status(200).json(user))
    .catch(err => res.status(500).json({ error: err }));
});

//Add new user
router.post('/', (req, res) => {
  const user = new Users({
    //body structure for created user
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    phone_number: req.body.phone_number,
    academic_research: req.body.academic_research,
    parent_age: req.body.parent_age,
    marital_status: req.body.marital_status,
    relation_to_child: req.body.relation_to_child,
    education: req.body.education,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    country: req.body.country,
    zip: req.body.zip
  });

  user.save()
    .then(newUser => res.status(201).json(newUser))
    .catch(err => res.status(500).json({ error: err }));
});

//Update existing user
router.put('/:_id', (req, res) => {
  const { _id } = req.params;
  const changes = req.body;

  Users.findByIdAndUpdate(_id, changes)
    .then(updatedUser => res.status(200).json(updatedUser))
    .catch(err => res.status(500).json({ error: err }));
});

//Delete existing user
router.delete('/:_id', (req, res) => {
  const { _id } = req.params;

  Users.findByIdAndDelete(_id)
    .then(deletedUser => res.status(200).json(deletedUser))
    .catch(err => res.status(500).json({ error: err }));
});

module.exports = router;