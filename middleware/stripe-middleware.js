module.exports = {
  checkStripeObj,
  checkStripeChargeObj,
  checkStripeOrderId,
  checkStripeCustomerId,
};

function checkStripeObj(req, res, next){
  const stripeReqs = req.body;

  if (!stripeReqs) res.status(404).json({ error: "Missing required Stripe data." });
  else if (!stripeReqs.stripeEmail) res.status(404).json({ error: "stripeEmail is a required field." });
  else if (!stripeReqs.stripeToken) res.status(404).json({ error: "stripeToken is a required field." });
	else next();
};

function checkStripeChargeObj(req, res, next){
  const stripeReqs = req.body;

  if (!stripeReqs) res.status(404).json({ error: "Missing required Stripe data." });
  else if (!stripeReqs.stripeToken) res.status(404).json({ error: "stripeToken is a required field." });
	else next();
};

function checkStripeOrderId(req, res, next){
  const stripeReqs = req.body;

  if (!stripeReqs) res.status(404).json({ error: "Missing required Stripe data." });
  else if (!stripeReqs.orderId) res.status(404).json({ error: "orderId is a required field." });
	else next();
};

function checkStripeCustomerId(req, res, next){
  const stripeReqs = req.body;

  if (!stripeReqs) res.status(404).json({ error: "Missing required Stripe data." });
  else if (!stripeReqs.id) res.status(404).json({ error: "id is a required field." });
	else next();
};