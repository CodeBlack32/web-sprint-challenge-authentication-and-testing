const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets");

const users = require("../users/users-model");

router.post("/register", (req, res) => {
  // implement registration
});

router.post("/login", (req, res) => {
  // implement login
});

module.exports = router;
