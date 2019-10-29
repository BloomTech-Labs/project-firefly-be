const Firefly = require("../models/fireflies");
const Children = require("../models/children");

module.exports = {
  validateFireflyId,
  checkFireflyObj,
  validateChildId,
};

function validateFireflyId(req, res, next) {
  const { _id } = req.params;

  Firefly.findById(_id)
  .then(firefly => {
    if (firefly) next();
    else res.status(404).json({ error: "Firefly profile does not exist." });
  })
  .catch(err => res.status(500).json({ error: err }));
};

function checkFireflyObj(req, res, next) {
  const firefly = req.body;

  if (!firefly) res.status(406).json({ error: "Missing firefly data." });
  else if (!firefly.child_id) res.status(406).json({ error: "child_id is a required field." });
  else if (!firefly.firefly_name) res.status(406).json({ error: "firefly_name is a required field." });
	else next();
};

function validateChildId(req, res, next) {
  const { child_id } = req.body;

  Children.findById(child_id)
  .then(child => {
    if (child) next();
    else res.status(404).json({ error: "Child profile does not exist." });
  })
  .catch(err => res.status(500).json({ error: err }));
};