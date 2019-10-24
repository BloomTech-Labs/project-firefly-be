// library imports
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet')
const cors = require('cors')
require('dotenv/config');

const server = express();

const usersRoute = require('./routes/users-routes');

// setting up mongoose 
mongoose.connect(process.env.URL, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })

// route handling
server.use('/users', usersRoute);

// middleware instantiation
server.use(express.json()); 
server.use(helmet()); 
server.use(cors({
	origin: '*'
})); 

module.exports = server; 
