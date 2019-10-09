const { gql } = require("apollo-server");

module.exports = gql`
  type Query {
    #//*User
    getCurrentUser: User
    getUsers: [User]
    getUserBy(param: String!, value: String!): User
    getUserById(userId: ID!): User
  }
  type Mutation {
    addUser(input: UserInput!): User!
  }
  type User {
    id: ID!
    username: String!
    password: String!
  }
  input UserInput {
    username: String!
    password: String!
  }
`;
