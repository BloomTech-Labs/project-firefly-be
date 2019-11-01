const firebase = require('../utils/firebase');

const Users = require('../models/users');

module.exports = {
  decodeFirebaseIdToken,
  validateOpenAccount,
  validateExistingAccount,
};

function decodeFirebaseIdToken(req, res, next) {
  //Looks for token in request header
  if (!req.headers.token) return res.status(404).json({ error: 'token not found.' });

  //Use firebase-admin to verify the token (created by client)
  //Token will return the user payload
  firebase.auth().verifyIdToken(req.headers.token)
  .then(userPayload => {
    // Pass the decoded information over to the route via res.locals
    // [res.local].user is dev-created property
    res.locals.user = userPayload;
    next();
  })
  .catch(err => res.status(500).json({ error: err }));
};

function validateOpenAccount(req, res, next) {
  const { email } = res.locals.user;

  Users.findOne({ email: email })
  .then(query => {
    if (!query) next();
    else res.status(422).json({ error: 'Email already in use. Please use another email.' });
  });
};

function validateExistingAccount(req, res, next) {
  const { email } = res.locals.user;

  Users.findOne({ email: email })
  .then(query => {
    if (!query) res.status(404).json({ error: 'Email not found. Please register first.' });
    else next();
  });
};