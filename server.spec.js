//Import Mongo Client for test use
const {MongoClient} = require('mongodb');

//Import server.js file and set names for directories
const server = require('./server');
const users = '/users'
const children = '/children'
const fireflies = '/fireflies'


describe('server', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(process.env.URL, {useNewUrlParser: true, useUnifiedTopology: true});
    db = await connection.db();
  });
  //clean the database before running the test and disconnect when done with the testing
  beforeAll(async () => { await db.collection('Users').deleteMany({}) });
  beforeAll(async () => { await db.collection('Children').deleteMany({}) });
  beforeAll(async () => { await db.collection('Fireflies').deleteMany({}) });
  afterAll(async () => { await connection.close() });


});