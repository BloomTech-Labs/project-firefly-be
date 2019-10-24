// library imports
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet')
const cors = require('cors')
const stripe = require('stripe')("sk_test_VmtIYWhIS9KlMGmbGZJaHLQ100DftVxMiC")
require('dotenv/config');

const server = express();

//import routes
const usersRoute = require('./routes/users-routes');
const childrenRoute = require('./routes/children-routes');
const fireflyRoute = require('./routes/firefly-routes');
const stripeRoute = require('./routes/stripe-routes');

// setting up mongoose 
mongoose.connect(process.env.URL, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })

// middleware instantiation
server.use(express.json()); 
server.use(helmet()); 
server.use(cors({
	origin: '*'
}));

// route handling
server.use('/users', usersRoute);
server.use('/children', childrenRoute);
server.use('/fireflies', fireflyRoute);
server.use('/stripe', stripeRoute)


module.exports = server; 

