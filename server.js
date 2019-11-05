// library imports
const express = require('express');
const session = require('cookie-session');
const mongoose = require('mongoose');
const helmet = require('helmet');
// const cors = require('cors');
require('dotenv/config');

const server = express();

// import routes
const usersRoute = require('./routes/users-routes');
const childrenRoute = require('./routes/children-routes');
const fireflyRoute = require('./routes/firefly-routes');
const stripeRoute = require('./routes/stripe-routes');
const authRoute = require('./auth/auth-routes');
const firebaseRoute = require('./auth/firebase-route');

// setting up mongoose 
mongoose.connect(process.env.URL, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false });

// setup session configurations
const sessionConfig = {
  name: 'Question', //keep em guessing
  secret: process.env.SECRET, // the magical words
  cookie: {
    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    //httpOnly prevents any type of non server side access, like someone injecting a script
    httpOnly: true,
    //sends a duplicate of the key with an encrypted value to reference to check and make sure the key has not been tampered with since being sent/created
    signed: true,
    //if a new key is made with the same name/value as a current one it will simply replace it
    overwrite: true
  },
  resave: false, //do not recreate the sessions, if all else constant, resign-in should still be done
  saveUninitialized: false, //has to be dynamic, should only be true if the user has accepted the terms of using the cookies
};

// middleware instantiation
server.use(express.json());
server.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", req.headers.origin); //req.headers.origin // '*'
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Set-Cookie");
  res.header('Access-Control-Allow-Credentials', true)
  next();
}); 
server.use(session(sessionConfig));
server.use(helmet());
// server.use(cors({
//   origin: '*',
//   // allows headers to be read
//   credentials: true
// }));


// route handling
server.use('/users', usersRoute);
server.use('/children', childrenRoute);
server.use('/fireflies', fireflyRoute);
server.use('/stripe', stripeRoute);
server.use('/auth', authRoute);
server.use('/auth', firebaseRoute);

module.exports = server;

