// Import the JWT and secrets
const jwt = require('jsonwebtoken')
require('dotenv/config');


module.exports = (user) => {
  // Create the payload and options
  const payload = {
    subject: user.id,
    email: user.email,
  };
  const options = {
    expiresIn: '8h',
  };

  return jwt.sign(payload, process.env.SECRET, options)
}