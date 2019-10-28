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
    //  //connect mongoose using the test server URL
    //  await mongoose.connect(process.env.URL, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
    //   //catch if an error occurs and exit the test process so it can be restarted, instead of an infinite check loop happening
    //   if (err) {
    //     console.error(err);
    //     process.exit(1);
    //   }
    // });
  });
  //clean the database before running the test and disconnect when done with the testing
  beforeAll(async () => { await db.collection('Users').deleteMany({}) });
  beforeAll(async () => { await db.collection('Children').deleteMany({}) });
  beforeAll(async () => { await db.collection('Fireflies').deleteMany({}) });
  afterAll(async () => { await connection.close() });


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
      it('should create a new user', async () => {
        //Connect the collection 
        const UserTbl = db.collection('Users');
        //Create an object and insert it
        const User = {first_name: 'John', last_name: 'Doe', email: 'jd@unkown.com', phone_number: 4458987654, academic_research: false}
        await UserTbl.insertOne(User);

        //Check if the user was inserted to the collection
        const check = await UserTbl.findOne({first_name: 'John'})
        expect(check).toEqual(User)
      })
      //simply to fill up the collection in order to test the following CRUD operations
      it('should create multiple users', async () => {
        //Connect the collection 
        const UserTbl = db.collection('Users');
        //Create an array of objects and insert it
        const Users = [{first_name: 'Jane', last_name: 'Doe', email: 'jd2@unkown.com', phone_number: 4458987754, academic_research: true},
        {first_name: 'Tony', last_name: 'Brick', email: 'tb@unkown.com', phone_number: 4458987854, academic_research: true},
        {first_name: 'Tina', last_name: 'Brick', email: 'tb2@unkown.com', phone_number: 4458987954, academic_research: false}];
        await UserTbl.insertMany(Users);

        //Check if the users were inserted to the collection
        const check = await UserTbl.find().toArray();
        expect(check).toEqual([
          expect.objectContaining({first_name: 'John'}),
          expect.objectContaining({first_name: 'Jane'}),
          expect.objectContaining({first_name: 'Tony'}),
          expect.objectContaining({first_name: 'Tina'})
        ]);
      })
      //error checking with insert
      it('fails to insert a field', async () => {
        //Connect the collection 
        const UserTbl = db.collection('Users');
        //Create an array of objects and insert it
        const Fail = {first_name: 12344}
        await UserTbl.insertOne(Fail);

        //check the result to make sure it wasn't inserted
        const check = await UserTbl.findOne({first_name: 12344})
        expect(check).toBe(undefined)
      })

    })

    //Read the Items
    describe('get()', () => {      
      it('gets all users information', async () => {
        const res = await request(server).get(`${users}`);
        // console.log('info', res)
        expect(res.status).toBe(200);
      });
      
      it('grabs all users information for a specific key/value pair', async () => {
        const res = await request(server).get(`${users}`)
        expect(res.body.account).toHaveLength(3); 
      });

      it('grabs a user by id', async () => {
        const res = await request(server).get(`${users}/1`);
        expect(res.status).toBe(200);
      });

      it('should return 404', async () => {
        const res = await request(server).get(`${users}/7`);
        expect(res.status).toBe(404);
      });
      
      it('returns a single user', async () => {
        const res = await request(server).get(`${users}/1`)
        expect(res.body.account.first).toBe('taco'); 
      });

      //get by phone number
      it('should return 200', async () => {
        const res = await request(server).get(`${users}/search/num`).send({ phone:'000-999-8888' });
        expect(res.status).toBe(200);
      });

      it('should return 404', async () => {
        const res = await request(server).get(`${users}/search/num`).send({ phone:'pp' });
        expect(res.status).toBe(404);
      });
      
      it('returns a single user', async () => {
        const res = await request(server).get(`${users}/search/num`).send({ phone:'000-999-8888' })
        expect(res.body.account.last).toBe('tuesday'); 
      });

      //get name
      it('should return', async () => {
        const res = await request(server).get(`${users}/search/name`).send({ first:'taco' });
        expect(res.status).toBe(200);
      });

      it('should return', async () => {
        const res = await request(server).get(`${users}/search/name`).send({ last:'all' });
        expect(res.status).toBe(404);
      });
      
      it('returns a list', async () => {
        const res = await request(server).get(`${users}/search/name`).send({ last:'tuesday' });
        expect(res.body.account).toHaveLength(1); 
      });
    })
    //Update the Items
    describe('put()', () => {
      it('should return 202', async () => {
        const res = await request(server).put(`${users}/1`).send({ first: '3DS' }).expect(202);
        expect(res.body.account.first).toBe('3DS')
      });
      
      it('return a 406', async () => {
        const res = await request(server).put(`${users}/1`).send({ taco:'ll' });
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