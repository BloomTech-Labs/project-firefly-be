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

  afterAll(async () => {
    await connection.close();
  });

  beforeAll(async () => { await db('users').truncate() })
  beforeAll(async () => { await db('children').truncate() })
  beforeAll(async () => { await db('fireflies').truncate() })

});