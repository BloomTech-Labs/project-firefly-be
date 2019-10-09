const User = require("../models/userModel.js");
const admin = require("firebase-admin");

exports.authAndFindUser = async token => {
  const googleUser = await verifyAuthToken(token);
  const [user] = await checkIfUserExists(googleUser.email);
  return user;
};

const verifyAuthToken = async token => {
  try {
    const ticket = await admin
      .auth()
      .verifyIdToken(idToken)
      .then(decodedToken => {
        let email = decodedToken.email;
        console.log(email);
      });
    return ticket;
  } catch (error) {
    console.log("Error verifying auth token", error);
  }
};

const checkIfUserExists = async email => await User.findBy({ email: email });
