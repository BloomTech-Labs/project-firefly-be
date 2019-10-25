const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
const express = require("express")

const router = express.Router()

const stripeChargeCallback = res => (stripeErr, stripeRes) => {
  if (stripeErr) {
    res.status(500).send({ error: stripeErr });
  } else {
    res.status(200).send({ success: stripeRes })
  }
}

router.get("/api/payment", (req, res) => {
  res.send({
    message: "Hello Stripe checkout server!",
    timestamp: new Date().toISOString()
  })
})

router.post("/api/payment", (req, res) => {
  //getting the token id subbmited by the form
  const token = request.body.stripeToken;

  const body = {
    amount: 999,
    currency: "usd",
    description: "Example charge",
    source: token,
    statement_descriptor: "Custom descriptor"
  };
  stripe.charges.create(body, stripeChargeCallback(res));
})

module.exports = router
