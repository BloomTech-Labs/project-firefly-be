module.exports = {
  validateStripeObj,
  validateStripeChargeObj,
  validateStripeOrderId,
  validateStripeCustomerId,
};

function validateStripeObj(req, res, next){
  const stripeReqs = req.body;

  if (!stripeReqs) res.status(404).json({ error: "Missing required Stripe data." });
  else if (!stripeReqs.stripeEmail) res.status(404).json({ error: "stripeEmail is a required field." });
  else if (!stripeReqs.stripeToken) res.status(404).json({ error: "stripeToken is a required field." });
	else next();
};

function validateStripeChargeObj(req, res, next){
  const stripeReqs = req.body;

  if (!stripeReqs) res.status(404).json({ error: "Missing required Stripe data." });
  else if (!stripeReqs.stripeToken) res.status(404).json({ error: "stripeToken is a required field." });
	else next();
};

function validateStripeOrderId(req, res, next){
  const stripeReqs = req.body;

  if (!stripeReqs) res.status(404).json({ error: "Missing required Stripe data." });
  else if (!stripeReqs.orderId) res.status(404).json({ error: "orderId is a required field." });
	else next();
};

function validateStripeCustomerId(req, res, next){
  const stripeReqs = req.body;

  if (!stripeReqs) res.status(404).json({ error: "Missing required Stripe data." });
  else if (!stripeReqs.id) res.status(404).json({ error: "id is a required field." });
	else next();
};