const router = require('express').Router();
const stripeLoader = require('stripe'); 
// conditional env variable rendering
if (process.env.NODE_ENV !== 'production') {
    require('dotenv')
}

// library imports
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// middleware
const mw = require('../middleware/stripe-middleware');

/*
=========3 STEPS TO STRIPE===========
1. Create products and plans (this is done in the stripe dashboard)
2. Create a customer (isn't needed for a 1 time charge)
3. Subscribe the customer to the plan (aka. create subscription with correct user ID)
*/

const stripeLoading = new stripeLoader(process.env.STRIPE_SECRET_KEY)

// =============== Step 2 - Customer creation ================

const MONTHLY_KEY = 'plan_G3My08N3nG7cuV';
const YEARLY_KEY = 'plan_G3MzlRFTkeqi0c';
// monthly subscription creation

    
router.post('/customer/subscription', (req, res) => {
    let plan = req.body.cycle === 'MONTHLY' ? MONTHLY_KEY : YEARLY_KEY;
    const { stripeToken, email } = req.body;

    stripe.customers.create({
        email: email,
        source: stripeToken.id // aka payment method
    }, function(err, customer) {
        if(err) {
            console.log(err)
            res.status(501); 
        } else {
            // console.log(customer); 
            stripe.subscriptions.create({
                customer: customer.id,
                items: [
                    {
                        plan: plan
                    }
                ]
            })
                .then(sub => {
                    res.status(201).json({ message: `Success!`, sub})
                })
                .catch(err => {
                    // console.log(err) 
                    res.status(500).json({ message: `Something went wrong...`, err})
                })
        }
    })
})



// yearly subscription creation

// router.post('/customer/sub-yearly', (req, res) => {
//     const { stripeToken, email } = req.body;
//     console.log(req.body); 

//     stripe.customers.create({
//         email: email,
//         source: stripeToken.id // aka payment method
//     }, function(err, customer) {
//         if(err) {
//             // console.log(err)
//             res.status(501); 
//         } else {
//             // console.log(customer); 
//             stripe.subscriptions.create({
//                 customer: customer.id,
//                 items: [
//                     {
//                         plan: 'plan_G3MzlRFTkeqi0c'
//                     }
//                 ]
//             })
//                 .then(sub => {
//                     res.status(201).json({ message: `Success!`, sub})
//                 })
//                 .catch(err => {
//                     // console.log(err) 
//                     res.status(500).json({ message: `Something went wrong...`, err})
//                 })
//         }
//     })
// })

// router.post('/customer/sub-yearly', (req, res) => {
//     const { stripeToken, email } = req.body;
//     console.log(req.body);
//     stripe.customers.create({
//         email: email,
//         source: stripeToken.id // aka payment method
//     }, function(err, customer) {
//         if(err) {
//             // console.log(err)
//             res.status(501);
//         } else {
//             // console.log(customer);
//             stripe.subscriptions.create({
//                 customer: customer.id,
//                 items: [
//                     {
//                         plan: 'plan_G3MzlRFTkeqi0c'
//                     }
//                 ]
//             })
//                 .then(sub => {
//                     res.status(201).json({ message: `Success!`, sub})
//                 })
//                 .catch(err => {
//                     // console.log(err)
//                     res.status(500).json({ message: `Something went wrong...`, err})
//                 })
//         }
//     })
// })




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
router.post('/v1/subscriptions', mw.checkStripeCustomerId, (req, res) => {
    const { id } = req.body; 

    stripe.subscriptions.create({
        customer: id, // customer identifier from request body
        items: [ //
            {
                plan: "montly", // items.plan is required!
            },
        ]
    }, function(err, subscription) {const router = require('express').Router();
        // asynchronously called (I think this is where we do our status messages/error handling)
    })
})

// create a new charge 
router.post('/api/stripe', /*mw.checkStripeChargeObj*/(req, res) => {
    const { stripeToken } = req.body; 

    console.log('check')
    stripe.charges.create({
        amount: 4.99,
        currency: 'usd', 
        description: 'monthly subscription charge for Project Firefly',
        source: stripeToken
    }, function(err, charge) {
        if (err) {
            res.status(401).json({
                success: false,
                error: err
            })
        } else {
            res.status(201).json({ message: `Success!`, charge})
        }
    })
})

// ======================== PUT requests ============================

// update a subscription by user identifier 
router.put('/v1/subscriptions/:id', mw.checkStripeOrderId, (req, res) => {
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