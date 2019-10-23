// library imports 
const router = require('express').Router();
const server = express(); 
const dotenv = require('dotenv');

const usersRoute = require('./routes/users');

// setting up mongoose 
mongoose.connect(
	process.env.URL,
	{
		useMongoClient: true
	})
	
// middleware instantiation
server.use(express.json()); 
server.use(helmet()); 
server.use(cors({
	origin: '*'
}));  



module.exports = server; 
