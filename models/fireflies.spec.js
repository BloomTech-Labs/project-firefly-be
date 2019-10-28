//import mongoose and the document being tested
const mongoose = require('mongoose');
const FireFly = require('./fireflies');
//import the secrets
require('dotenv').config()
const flyData = { firefly_name: 'josh' };

describe('FireFly Model Test', () => {
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
  it('create & save Fly successfully', async () => {
    //create new object using model and save it
    const newFly = new FireFly(flyData);
    const newObject = await newFly.save();
    // Object Id should be defined when successfully saved to MongoDB.
    expect(newObject._id).toBeDefined();
  });

  // Test Schema is working!!!
  // You shouldn't be able to add in any field that isn't defined in the schema
  it('should display undefined for fields that are not in the schema' , async () => {
    //define the invalid object, then create and save it  
    const invalidObject = new FireFly({ firefly_name: 'Jin', email: 'at@me.com' });
    const savedFly= await invalidObject.save();
    //check the results  
    expect(savedFly._id).toBeDefined();
    expect(savedFly.email).toBeUndefined();
  });

  // Test Validation is working!!!
  // It should notify us of any errors in field types, or required fields
  it('create Fly without required field should failed', async () => {
    //Create an Object thats missing a required field  
    const incompleteFly = new FireFly({ Fly_age: 4 });
    let err;
    try {
      const savedFail = await incompleteFly.save();
      error = savedFail;
    } catch (error) {
      err = error
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
    expect(err.errors.firefly_name).toBeDefined();
  });    

  it('should not allow you to put the wrong field type in a required field', async () =>{
    //Create an Object that has the wrong type of info in the field and save it
    const wrongFly = new FireFly({ firefly_name: 9999 });
    const savedError = await wrongFly.save();

    //The int should automatically convert to a string to correct the wrong input type
    expect(savedError.firefly_name).toBe("9999")
  })
})