// library imports
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv/config');

const server = express();

// import middleware
const authenticate = require('./auth/restriction-middleware')

// import routes
const usersRoute = require('./routes/users-routes');
const childrenRoute = require('./routes/children-routes');
const fireflyRoute = require('./routes/firefly-routes');
const stripeRoute = require('./routes/stripe-routes');
const authRoute = require('./auth/auth-routes');
const firebaseRoute = require('./auth/firebase-route');

// setting up mongoose 
mongoose.connect(process.env.URL, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false });

// middleware instantiation
server.use(express.json());
server.use(helmet());
server.use(cors({
  origin: '*',
  // allows headers to be read
  credentials: true
}));


// route handling
server.use('/users', usersRoute);
server.use('/children', authenticate, childrenRoute);
server.use('/fireflies', authenticate, fireflyRoute);
server.use('/stripe', stripeRoute);
server.use('/auth', authRoute);
server.use('/auth', firebaseRoute);

module.exports = server;