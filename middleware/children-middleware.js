const Users = require("../models/users");
const Children = require("../models/children");

module.exports = {
  validateChildId,
  checkChildObj,
  validateParentId,
};

function validateChildId(req, res, next) {
  const { _id } = req.params;

  Children.findById(_id)
  .then(child => {
    if (child) next();
    else res.status(404).json({ error: "Child profile does not exist." });
  })
  .catch(err => res.status(500).json({ error: err }));
};

function checkChildObj(req, res, next) {
  const child = req.body;

  if (!child) res.status(406).json({ error: "Missing child data." });
  else if (!child.parent_id) res.status(406).json({ error: "parent_id is a required field." });
  else if (!child.child_name) res.status(406).json({ error: "child_name is a required field." });
	else next();
};

function validateParentId(req, res, next) {
  const { parent_id } = req.body;

  Users.findById(parent_id)
  .then(parent => {
    if (parent) next();
    else res.status(404).json({ error: "Parent profile does not exist." });
  })
  .catch(err => res.status(500).json({ error: err }));
};