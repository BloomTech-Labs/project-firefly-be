const router = require('express').Router();
const bcrypt = require('bcryptjs')
const generator = require('generate-password')

const Users = require('../models/users')

// config file for password generation; defaulted false values flipped to true
const passConfig = {
  length: 50,
  numbers: true,
  symbols: true
}

// Google routes
// Create a new account via Google
router.post('/google/register', (req, res) => {
  const user = new Users({
    //body structure for created user
    email: req.body.email,
    //password is automatically generated to fulfill model requirements
    //neither the developer or user knows the password as authentication will occur via token verification
    password: bcrypt.hashSync(generator.generate(passConfig), 12),
    first_name: null,
    last_name: null,
    phone_number: null,
    academic_research: false,
    parent_age: null,
    marital_status: null,
    relation_to_child: null,
    education: null,
    address: null,
    city: null,
    state: null,
    country: null,
    zip: null
  });

  user.save()
  .then(newUser => res.status(201).json(newUser))
  .catch(err => res.status(500).json({ error: err }));
});

// Login via Google
router.post('/google/login', (req, res) => {
  const { email } = req.body;

  Users
  //Query to search for a user where the emails match
  .findOne({ email: email })
  .then(user => {
    req.session.user = user
    //Creating the session name <-- cookie injection :)
    res.status(200).json( 'Welcome' );
  })
  .catch(err => res.status(500).json(err))
})

module.exports = router;