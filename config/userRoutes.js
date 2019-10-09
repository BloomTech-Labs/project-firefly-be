//import express and set route
const express = require('express');
const router = express.Router();

//import db
const users= require('./user-model.js');

//set error msgs
const sendError = (msg, res) => {
  res.status(500).json({ error: `${msg}`});
};

//CRUD requests
//get actions
router.get('/', (req, res) => {
  users
  .get()
  .then( user=> {
    res.status(200).json({ user });
  })
  .catch( err => {
    return sendError( err, res );
  })
})

module.exports = router;