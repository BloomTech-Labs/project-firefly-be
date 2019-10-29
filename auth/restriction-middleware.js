//Import bcrypt to use for hash compare
const bcrypt = require('bcryptjs')
//Import the model
const Users = require('../models/users');

//Set error msgs
const error = (msg, sts, res) => {
  res.status(sts).json({ error: `${msg}`});
};

module.exports = (req, res, next) => {
  //Grab information about the user from the headers
  const { email, password } = req.headers;

  //If the password and email exists then find the user associated
  if( email && password ) {
    Users
    .find({ email: email })
    .then(user => {
      //If the password is correct allow them to continue
      if (user && bcrypt.compareSync(password, user.password)) {
        next();
      }
      //Otherwise fish for the correct information
      else {
        error( 'sorry bro its wrong ', 401, res )
      }
    })
    .catch( err => {
      error( err, 500, res)
    })
  }
  else {
    error( 'gimmie some relevant info dawgs', 406, res )
  }
};