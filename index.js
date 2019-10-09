require('dotenv').config(); // load .env variables
// setting up staging
// setting up development

const server = require('./server.js');

const port = process.env.PORT || 3300;

server.listen(port, () => {   console.log(`\n Let's do this thing... Server is Running on http://localhost:${port} \n`) })
