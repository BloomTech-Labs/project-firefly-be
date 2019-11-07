const router = require('express').Router();
const bcrypt = require('bcryptjs')
const generator = require('generate-password')

const mw = require('./firebase-middleware')
const generateToken = require('./generateToken')

const Users = require('../models/users')

// config file for password generation; defaulted false values flipped to true
const passConfig = {
  length: 50,
  numbers: true,
  symbols: true
}

// Create a new account via firebase sign-in method
router.get('/firebase/register', mw.decodeFirebaseIdToken, mw.validateOpenAccount, (req, res) => {
  const user = new Users({
    //body structure for created user
    email: res.locals.user.email,
    //password is automatically generated to fulfill model requirements
    //neither the developer or user knows the password as authentication will occur via token verification
    password: bcrypt.hashSync(generator.generate(passConfig), 12)
  });

  user.save()
  .then(newUser => res.status(201).json(newUser))
  .catch(err => res.status(500).json({ error: err }));
});

router.get('/firebase/login', mw.decodeFirebaseIdToken, mw.validateExistingAccount, (req, res) => {
  const { email } = res.locals.user;
  
  Users
  //Query to search for a user where the emails match
  .findOne({ email: email })
  .then(user => {
    // Create a token
    const token = generateToken(user)

    res.status(200).json({ message: 'Welcome', token });
  })
  .catch(err => res.status(500).json(err))
})

module.exports = router;