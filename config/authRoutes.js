const axios = require("axios");
const bcrypt = require("bcryptjs");
const Users = require("./auth-model");
const jwt = require("jsonwebtoken");
const db = require("../data/dbConfig");

const { authenticate, jwtKey } = require("../auth/authentication.js");

module.exports = server => {
  server.post("/register", register);
  server.post("/login", login);
};

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  };

  const options = {
    expiresIn: "1d"
  };

  return jwt.sign(payload, jwtKey, options);
}

function register(req, res) {
  // implement user registration
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  if (!user.username || !user.password) {
    res.status(404).json({ message: "Please enter a username and password" });
  } else {
    Users.add(user)
      .then(newUser => {
        res.status(201).json(newUser);
      })
      .catch(() => res.status(500).json({ message: "Server error" }));
  }
}

function login(req, res) {
  // implement user login
  let { username, password } = req.body;

  db("users")
    .where({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res
          .status(200)
          .json({ message: `Hey ${user.username}! Your token is:`, token });
      } else {
        res
          .status(401)
          .json({ message: "Username and password didn't match." });
      }
    })
    .catch(() => res.status(500).json({ message: "Server error" }));

}