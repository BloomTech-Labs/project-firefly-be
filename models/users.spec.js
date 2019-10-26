//import mongoose and the document being tested
const mongoose = require('mongoose');
const Users = require('./users');
//import the secrets
require('dotenv').config()
const userData = { email: 'jk@hicomedy.com', password: 'supportthearts' };

describe('User Model Test', () => {
  // Connect to the MongoDB Memory Server using mongoose.connect
  beforeAll(async () => {
    //connect mongoose using the test server URL
    await mongoose.connect(process.env.URL, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
      //catch if an error occurs and exit the test process so it can be restarted, instead of an infinite check loop happening
      if (err) {
        console.error(err);
        process.exit(1);
      }
    });
  });

  //Test Model is working!!
  //Model allows for Object creation
  it('create & save user successfully', async () => {
    //create new object using model and save it
    const newUser = new Users(userData);
    const newObject = await newUser.save();
    // Object Id should be defined when successfully saved to MongoDB.
    expect(newObject._id).toBeDefined();
  });

  // Test Schema is working!!!
  // You shouldn't be able to add in any field that isn't defined in the schema
  it('should display undefined for fields that are not in the schema' , async () => {
    //define the invalid object, then create and save it  
    const invalidObject = new Users({ name: 'TekLoon', email: 'at@me.com', password: 'sadhidahsidsad' });
    const savedUser= await invalidObject.save();
    //check the results  
    expect(savedUser._id).toBeDefined();
    expect(savedUser.name).toBeUndefined();
  });

  // Test Validation is working!!!
  // It should notify us of any errors in field types, or required fields
  it('create user without required field should failed', async () => {
    //Create an Object thats missing a required field  
    const incompleteUser = new Users({ email: 'goon@squad.com' });
    let err;
    try {
      const savedFail = await incompleteUser.save();
      error = savedFail;
    } catch (error) {
      err = error
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
    expect(err.errors.password).toBeDefined();
  });    
})