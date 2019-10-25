const Users = require("../models/users");

module.exports = {
  validateUserId,
  validateUserObj,
  validateUniqueEmail,
};

function validateUserId(req, res, next) {
  const { _id } = req.params;

  Users.findById(_id)
  .then(user => {
    if (user) next();
    else res.status(404).json({ error: "User does not exist." });
  })
  .catch(err => res.status(500).json({ error: err }));
};

function validateUserObj(req, res, next) {
  const user = req.body;

  if (!user) res.status(404).json({ error: "Missing user data." });
  else if (!user.first_name) res.status(404).json({ error: "first_name is a required field." });
  else if (!user.last_name) res.status(404).json({ error: "last_name is a required field." });
  else if (!user.email) res.status(404).json({ error: "email is a required field." });
  else if (!user.phone_number) res.status(404).json({ error: "phone_number is a required field." });
	else next();
};

function validateUniqueEmail(req, res, next) {
  const { _id } = req.params;
  const { email } = req.body;

  Users.findOne({ email: email })
  .then(query => {
    if (req.method == "POST") {
      if (!query) next();
      else res.status(422).json({ error: 'Email already in use. Please use another email.' });
    } else if (req.method == "PUT") {
      if (!query) next();
      else if (query._id == _id && query.email == email) next();
      else res.status(422).json({ error: 'Email already in use. Please use another email.' });
    };
  });
};