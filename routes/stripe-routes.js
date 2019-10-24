const router = require('express').Router();

// conditional env variable rendering
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load()
}

// library imports
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

/*
=========3 STEPS TO STRIPE===========
1. Create products and plans
2. Create a customer (isn't needed for a 1 time charge)
3. Subscribe the customer to the plan
*/


// =============== Step 1 - creating products and plans ================

// defining product
(async () => {
    const product = await stripe.products.create({
      name: 'Project Firefly',
      type: 'service',
      description: 'Subscription to play Project Firefly'
    }, function(err, product) {
        async
    });
  })();

// defining plans

// monthly sub
(async () => {
    const monthly = await stripe.plans.create({
        product: 'prod_CbvTFuXWh7BPJH',
      nickname: 'Project Firefly Monthly Subscription USD',
      currency: 'usd',
      interval: 'month',
      amount: 4.99,
    });
  })();

// yearly  sub 
(async () => {
    const yearly = await stripe.plans.create({
      product: 'prod_CbvTFuXWh7BPJH',
      nickname: 'Project Firefly Yearly Subscription',
      currency: 'usd',
      interval: 'year',
      amount: 49.99,
    });
  })();

// =============== Step 2 - Customer creation ================

// customer creation 






// Route handling

// ========================= GET requests ===========================

//retrieve a subscription by customer identifier
router.get('/v1/subscriptions/:id', (req, res) => {
    const { id } = req.params; 

    stripe.subscriptions.retrieve(
        id, // customer identifier 
        function(err, subscription) {
          // asynchronously called
        }
      );
})

// get ALL subscriptions
router.get('/v1/subscriptions', (req, res) => {
    stripe.subscriptions.list(
        // { limit: 5 }  UNCOMMENT THIS TO LIMIT THE AMOUNT OF SUBS YOU RECEIVE
        function(err, subscriptions) {
            // async
        }
    )
})

// ========================= POST requests ===========================

// create a subscription
router.post('/v1/subscriptions', (req, res) => {
    const { id } = req.body; 

    stripe.subscriptions.create({
        customer: id, // customer identifier from request body
        items: [ //
            {
                plan: "gold", // items.plan is required!
            },
        ]
    }, function(err, subscription) {
        // asynchronously called (I think this is where we do our status messages/error handling)
    })
})

// create a new charge 
router.post('/')

// ======================== PUT requests ============================

// update a subscription by user identifier 
router.put('/v1/subscriptions/:id', (req, res) => {
    const { id } = req.params; 
    const { orderId } = req.body; 

    stripe.subscriptions.update(
        id,
        { metadata: { order_id: orderId }}, 
        function(err, subscription) {
            // async
        }
    )
})

// ======================= DELETE requests =======================

// cancel a subscription by user identifier
router.delete('/v1/subscriptions/:id', (req, res) => {
    const { id } = req.params;

    stripe.subscriptions.del(
        id,
        function(err, confirmation) {
            // async
        }
    )
})




module.exports = router; 