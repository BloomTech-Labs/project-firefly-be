const router = require('express').Router()

const server = express(); 

// library imports 
const dotenv = require('dotenv'); 

// setting up mongoose 
mongoose.connect(
	`mongodb+srv://projectfirefly:${process.env.PASSWORD}@project-firefly-qsjuq.mongodb.net/test?retryWrites=true&w=majority`)
	{
		useMongoClient: true
	}
// middleware instantiation
server.use(express.json()); 
server.use(helmet()); 
server.use(cors({
	origin: '*'
})); 



module.exports = server; 
