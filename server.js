const router = require('express').Router()

const server = express(); 

// middleware instantiation
server.use(express.json()); 
server.use(helmet()); 
server.use(cors({
	origin: '*'
}); 



module.exports = server; 
