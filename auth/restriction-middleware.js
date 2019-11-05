// Set error msgs
const error = (msg, sts, res) => {
  res.status(sts).json({ error: `${msg}`});
};

module.exports = (req, res, next) => {
  // Check the current session key vs the key given to the user upon login
  if( req.session && req.session.user ) {
    next();
  }
  else {
    error( 'remove yourself from the front of this gate dawgs', 401, res )
  }
};