//Import supertest, Mongo Client, and mongoose for test use
const {MongoClient} = require('mongodb');
const mongoose = require('mongoose');
const request = require('supertest');
//Import the secrets
require('dotenv').config();
//Import server.js file
const server = require('./server');

describe('server', () => {
  let connection;
  let db;
  const auth = '/auth'
  const users = '/users'
  const children = '/children'
  const firefly = '/firefly'

  beforeAll(async () => {
    connection = await MongoClient.connect(process.env.URL, {useNewUrlParser: true, useUnifiedTopology: true});
    db = await connection.db();
  });
  //clean the database before running the test and disconnect when done with the testing
  beforeAll(async () => { await db.collection('users').deleteMany({}) });
  beforeAll(async () => { await db.collection('children').deleteMany({}) });
  beforeAll(async () => { await db.collection('fireflies').deleteMany({}) });
  afterAll(async () => { await connection.close() });

  //Check if the server.js file imported properly
  it('checking the root point should return 200 OK', () => {
    // we return the promise
    expect(server).toBeDefined()
  });

  //Set the order as post -> get -> put -> delete so that you don't have to use seed items you can go from a clean table
  // describe('auth route', () => {
  //   describe('post()', () => {
  //     it('should return 201', async () => { 
  //       await request(server).post(`${auth}/register`).send({ first: "taco", last: "tuesday", phone: "000-999-8888", email: "mom", password: "hi" });
  //       await request(server).post(`${auth}/register`).send({ first: "mobile", last: "monday", phone: "000-999-7777", email: "dad", password: "hey" });
  //       await request(server).post(`${auth}/register`).send({ first: "wicked", last: "wednesday", phone: "000-999-6666", email: "spouse", password: "hello" })
  //       .expect(201);
  //     });
      
  //     it('should return 422 missing info', done => {
  //       return request(server)
  //       .post(`${auth}/register`)
  //       .send({ first: 'PSP' })
  //       .expect(422, done);
  //     });
  
  //     it('should return 200', done => {
  //       // we return the promise
  //       return request(server)
  //       .post(`${auth}/login`)
  //       .send({ first: "taco", last: "tuesday", phone: "000-999-8888", email: "mom", password: "hi" })
  //       .expect(200, done);
  //     });
      
  //     it('should return 401 unauthorized user', done => {
  //       return request(server)
  //       .post(`${auth}/login`)
  //       .send({ first: 'PSP', password: 'no', email:'hi' })
  //       .expect(401, done);
  //     });
  //   })

  //   describe('get', () => {
  //     it('should log out and return ', async () => {
  //       const res = await request(server).get(`${auth}/logout`);
  //       expect(res.type).toBe('text/html')
  //     });
  //   })
  // })

  //User Route CRUD Requests
  describe('user route', () => {  
    //Create the Items
    describe('post()', () => {
      it('should return fail 404 for missing info', async () => {
        //Create an object
        const User = {last_name: 'Doe',  phone_number: 4458987654, academic_research: false}
        //Check if the user was inserted to the collection
        const res = await request(server).post(`${users}`).send(User);
        expect(res.status).toEqual(404)
      })
      //simply to fill up the collection in order to test the following CRUD operations
      it('should return 201 for success', async () => {
        //Create an array of objects and insert it
        await request(server).post(`${users}`).send({password: 'tposss', first_name: 'Jane', last_name: 'Doe', email: 'jd2@unkown.com', phone_number: 4458987754, academic_research: true});
        await request(server).post(`${users}`).send({password: 'tyosss', first_name: 'Tony', last_name: 'Brick', email: 'tb@unkown.com', phone_number: 4458987854, academic_research: true});
        await request(server).post(`${users}`).send({password: 'typsss', first_name: 'Tina', last_name: 'Brick', email: 'tb2@unkown.com', phone_number: 4458987954, academic_research: false})
        //Check if the users were inserted to the collection
        .expect(201)
      })
      //error checking with insert
      it('fails with 422 due to a repeat of unique information', async () => {
        //Create an object
        const User = {password: 'typsss', first_name: 'Tina', last_name: 'Brick', email: 'tb2@unkown.com', phone_number: 4458987654, academic_research: false}
        //Check if the user was inserted to the collection
        const res = await request(server).post(`${users}`).send(User);
        expect(res.status).toEqual(422)
      })

    })

    //Read the Items
    describe('get()', () => {     
      let testID = '';
      it('gets users information', async () => {
        const res = await request(server).get(`${users}`);
        //check the response grabbed the right info from the DB
        expect(res.status).toBe(200);
      });
      
      it('grabs all users information correctly', async () => {
        const res = await request(server).get(`${users}`);
        //create a test ID for the get by ID test 
        testID = res.body[0]._id
        //check that the number of objects created is equal to the number of objects received
        expect(res.body).toHaveLength(3); 
      });

      //Get By ID
      it('grabs a user by id', async () => {
        const res = await request(server).get(`${users}/${testID}`);
        //check that a user was grabbed using the test ID
        expect(res.status).toBe(200);
        //check that the information received is correct 
        expect(res.body.first_name).toBe('Jane')
      });

      it('should return 404, for nonexisting user', async () => {
        //call the get request with a random ID string
        const res = await request(server).get(`${users}/5db723217f5c0f9db7800700`);
        //check that the missing error is displayed
        expect(res.status).toBe(404);
      });
    });

    //Update the Items
    describe('put()', () => {
      //create a test ID, Password and Email to use for the rest of the test
      it('grab test info', async () =>{
        //has to be done with async await to work properly so it has to be in a it call
        const test = await request(server).get(`${users}`)
        testID = test.body[0]._id
        testEmail = test.body[0].email
        testPass = test.body[0].password
      });

      it('should return 202 and have the correct information', async () => {
        //pass in all the information and check that the returned status is 202 Accepted
        const res = await request(server).put(`${users}/${testID}`).send({ email: `${testEmail}`, password: `${testPass}`, marital_status: 'widow' }).expect(202);
        //check that the information received is actually correct
        console.log(res.body)
        expect(res.body.marital_status).toBe('widow')
      });
      
      it('return a 406', async () => {
        const res = await request(server).put(`${users}/${testID}`).send({ email:'ll' });
        expect(res.status).toBe(406);
      });

      it('return a 404 missing id', async () => {
        const res = await request(server).put(`${users}/10`).send({ email: 'nindie'});
        expect(res.status).toBe(404);
      });
    })
    //Delete the Items
    describe('delete()', () => {
      it('should return 202', async () => {
        const res = await request(server).delete(`${users}/1`);
        expect(res.status).toBe(202)
      });

      it('return a 404 missing id', async () => {
        const res = await request(server).delete(`${users}/10`);
        expect(res.status).toBe(404);
      });
    })
  });

  //Children Route CRUD Requests
  describe('children route', () => {
    //Create Items
    describe('post()', () => {
    
    })
    //Read the Items
    describe('get()', () => {      
      
    })
    //Update the Items
    describe('put()', () => {
      
    })
    //Delete the Items
    describe('delete()', () => {
      
    })
  })

  //Firefly Route CRUD Requests
  describe('firefly route', () => {
    //Create Items
    describe('post()', () => {
    
    })
    //Read the Items
    describe('get()', () => {      
      
    })
    //Update the Items
    describe('put()', () => {
      
    })
    //Delete the Items
    describe('delete()', () => {
      
    })
  })
});