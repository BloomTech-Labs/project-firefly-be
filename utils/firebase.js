// Import library
const firebase = require("firebase-admin");
require('dotenv/config');

// Import account that will be used
const serviceAccount = require("./firebase-service-account.json");

// Export Firebase initilization
module.exports = firebase.initializeApp({
  credentials: firebase.credential.applicationDefault(),
  databaseURL: process.env.FIREBASE_DATABASE_URL
});