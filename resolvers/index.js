const GMR = require("graphql-merge-resolvers");
const userResolvers = require("./users/userResolvers.js");

module.exports = GMR.merge([userResolvers]);
