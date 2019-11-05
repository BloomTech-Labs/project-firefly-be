// Import JWT and Secrets
const jwt = require('jsonwebtoken')
require('dotenv/config');

// Set error msgs
const error = (msg, sts, res) => {
  res.status(sts).json({ error: `${msg}`});
};

module.exports = (req, res, next) => {
  // Check token out from header
  const token = req.headers.authorization;

  if (token) {
    // Verify that the token
    jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
      if (err) {
        error( 'Invalid Login or Token Expired.', 401, err )
      } else {
        req.user = { username: decodedToken.username }
        next()
      }
    })
  } else {
    res.status(400).json({ message: 'No Credentials provided!' });
  }
};