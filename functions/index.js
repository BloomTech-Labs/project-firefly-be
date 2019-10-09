const functions = require("firebase-functions");
const admin = require("firebase-admin");

const cors = require("cors");

// Set GOOGLE_APPLICATION_CREDENTIALS env variable to private key path
// https://firebase.google.com/docs/functions/local-emulator
admin.initializeApp();
const db = admin.firestore();

exports.createUser = functions.auth.user().onCreate(async user => {
    try {
        await db
            .collection("users")
            .doc(user.uid)
            .set(
                {
                    email: user.email,
                    first_name: "",
                    last_name: "",
                    academic_research: false,
                },
                { merge: true }
            )
            .then(() => {
                return db
                    .collection("users")
                    .doc(user.uid)
                    .collection("information")
                    .add({
                        address: "",
                        city: "",
                        state: "",
                        zip: "",
                        country: "",
                        marital_status: "",
                        job: "",
                        education: "",
                        age: 0,
                        children_relation: "",
                    });
            });
    } catch (error) {
        console.log(error);
    }
});
