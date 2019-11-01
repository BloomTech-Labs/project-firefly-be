// Import library
const firebase = require("firebase-admin");
require('dotenv/config');

// Import service account that will be used as a certificate authenticator
const serviceAccount = require("./firebase-service-account.js");

// Export Firebase initilization
module.exports = firebase.initializeApp({
  // Used to access firebase without a certification
  // credentials: firebase.credential.applicationDefault(),

  // Used to access firebase with a certification (in order to verify the token received)
  credentials: firebase.credential.cert(serviceAccount),

  // Values obtained from the Firebase SDK snippet of project (found in settings)
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
});