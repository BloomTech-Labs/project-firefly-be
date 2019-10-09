const { ApolloServer } = require("apollo-server");

// const cors = require('cors');
// const helmet = require('helmet');
// const morgan = require('morgan');

// const authRoutes = require("./config/authRoutes.js");
// const userRoutes = require("./config/userRoutes.js");

const typeDefs = require("./typeDefs.js");
const resolvers = require("./resolvers/index.js");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
  context: async ({ req }) => {
    let authToken = null;
    let currentUser = null;
    try {
      authToken = req.headers.authorization;
      if (authToken) {
        currentUser = await authAndFindUser(authToken);
      }
    } catch (error) {
      console.log(`Unable to authenticate user ${authToken}`);
    }
    return currentUser;
  }
});

// server.use(helmet());
// server.use(cors());
// server.use(morgan("dev"));

// server.use(express.json());

// authRoutes(server);
// server.use("/users", userRoutes);

// server.get("/", (req, res) => {
//   res.status(200).json("in the server.get test");
// });

module.exports = server;
