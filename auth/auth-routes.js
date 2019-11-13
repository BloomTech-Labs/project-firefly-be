//Start a router and import bcrypt
const router = require('express').Router();
const bcrypt = require('bcryptjs') // Bcryptjs is better for us to use because it is available in more places than bcrypt which is native to C++

//Import database
const Users = require('../models/users')

//Import middleware
const mw = require('../middleware/users-middleware')
const generateToken = require('./generateToken')

//Set error msgs
const error = (msg, sts, res) => {
  res.status(sts).json({ error: `${msg}`});
};

//CRUD Requests
//Register 
router.post('/register', mw.checkUserObj, mw.validateUniqueEmail, ( req, res ) => {
  // Grab the users information from the body
  let user = req.body;
  // Encrypt the password with a hash and set the user's password to the hash
  const hash = bcrypt.hashSync(user.password, 12);
  user.password = hash;
  // Call the collection and save the new user's information with the password swapped for the hash
  const newUser = new Users(user)

  newUser
  .save()
  .then(user => {
    const token = generateToken(user)

    res.status(200).json({ message: 'Welcome', user, token });
  })
  .catch( err => {
    error( err, 500, res );
  })
})

//Login
router.post('/login', mw.checkUserObj, (req, res) => {
  const { email, password } = req.body;
  
  Users
  //Query to search for a user where the emails match
  .findOne({ email: email })
  .then(user => {
    //If the password matches after going through the hash continue
    if (user && bcrypt.compareSync(password, user.password)) {
      // Create a token
      const token = generateToken(user)

      res.status(200).json({ message: 'Welcome', user, token });
    }
    else {
      error( 'Wrong Information', 401, res )
    }
  })
  .catch( err => {
    error( err, 500, res)
  })
})

//Logout
router.get('/logout', (req, res) => {
  //Check for a current session in progress and then end it with a destroy method
  if(req.session) { 
    //Destroy session by setting it to null
    req.session.destroy
    //End the response to close
    res.send('Otsukare Sama Desu!')
  }
  //If a session doesn't exist notify the user to login
  else {
    res.send('Gomen!*Smoke Bomb*') 
  }
})

module.exports = router;