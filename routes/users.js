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

  Users.findById({ _id })
    .then(user => res.status(200).json(user))
    .catch(err => res.status(500).json({ error: err }));
});

//Add new user
router.post('/', (req, res) => {
  const user = new Users({
    //add body structure here
    //first_name: req.body.first_name
    //last_name: req.body.last_name
  });

  user.save()
    .then(newUser => res.status(201).json(newUser))
    .catch(err => res.status(500).json({ error: err }));
});

//Update existing user

//Delete existing user

module.exports = router