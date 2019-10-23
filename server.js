const router = require('express').Router()

const server = express(); 

// library imports 
const dotenv = require('dotenv'); 

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
