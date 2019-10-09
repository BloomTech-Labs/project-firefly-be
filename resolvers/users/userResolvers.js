const { AuthenticationError } = require("apollo-server");
const User = require("../../models/userModel.js");

const authenticated = next => (root, args, ctx, info) => {
  if (!ctx.currentUser) {
    throw new AuthenticationError("You must be logged in");
  }
  return next(root, args, ctx, info);
};

module.exports = {
  Query: {
    getUserBy: async (root, args, ctx) => {
      const user = await User.findBy({ [args.param]: args.value });
      return user[0];
    },
    getUserById: async (root, args, ctx) => {
      const user = await User.findById(args.userId);
      return user;
    },
    getCurrentUser: authenticated((root, args, ctx) => {
      return ctx.currentUser;
    }),
    getUsers: async (root, args, ctx) => {
      const users = await User.getAll();
      return users;
    }
  },
  Mutation: {
    addUser: async (root, args, ctx) => {
      const user = await User.addUser(args.input);
      return user;
    }
  }
};
