//import mongoose and the document being tested
const mongoose = require('mongoose');
const Children = require('./children');
//import the secrets
require('dotenv').config()
const childData = { child_name: 'josh', child_age: 7 };

describe('Children Model Test', () => {
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
  it('create & save children successfully', async () => {
    //create new object using model and save it
    const newChild = new Children(childData);
    const newObject = await newChild.save();
    // Object Id should be defined when successfully saved to MongoDB.
    expect(newObject._id).toBeDefined();
  });

  // Test Schema is working!!!
  // You shouldn't be able to add in any field that isn't defined in the schema
  it('should display undefined for fields that are not in the schema' , async () => {
    //define the invalid object, then create and save it  
    const invalidObject = new Children({ child_name: 'Tekken', email: 'at@me.com' });
    const savedChild= await invalidObject.save();
    //check the results  
    expect(savedChild._id).toBeDefined();
    expect(savedChild.email).toBeUndefined();
  });

  // Test Validation is working!!!
  // It should notify us of any errors in field types, or required fields
  it('create children without required field should failed', async () => {
    //Create an Object thats missing a required field  
    const incompleteChild = new Children({ child_age: 4 });
    let err;
    try {
      const savedFail = await incompleteChild.save();
      error = savedFail;
    } catch (error) {
      err = error
    }
    //check that the error pops up properly
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
    expect(err.errors.child_name).toBeDefined();
  });    

  it('should not allow you to put the wrong field type in a required field', async () =>{
    //Create an Object that has the wrong type of info in the field
    const wrongChild = new Children({ child_name: 123, child_age: '9as' });
    let err;
    try {
      const savedError = await wrongChild.save();
      error = savedError;
    } catch(error) {
      err = error
    }
    //Check that the error pops up properly
    //Number gets converted to a string and string presents a validation/cast type error 
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
    expect(err.errors.child_age).toBeDefined();
  })
})