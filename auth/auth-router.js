const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets");

const users = require("../users/users-model");

router.post("/register", (req, res) => {
  // implement registration
  const user = req.body;
  const hash = bcrypt.hashSync(user.password, 15);
  user.password = hash;

  users
    .add(user)
    .then((addedUser) => {
      res.status(201).json(addedUser);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.post("/login", (req, res) => {
  // implement login
  const { username, password } = req.body;

  users
    .findBy({ username })
    .first()
    .then((user) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = giveToken(user);

        res.status(200).json({
          message: `Thank You ${user.username} for logging in!`,
          jwt_token: token,
        });
      } else {
        res.status(401).json({ message: "Invalid Log-In Credentials!" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

function giveToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    use: ["USER", "ADMIN", "VIEWER"],
    isUser: true,
  };
  const secret = secrets.jwt_secret;
  const options = {
    expiresIn: "30d",
  };
  return jwt.sign(payload, secret, options);
}

module.exports = router;
