const router = require("express").Router();
const checkUse = require("../auth/check-use-middleware");

const users = require("./users-model");
const restricted = require("../auth/authenticate-middleware");

router.get("/", restricted, checkUse("USER"), (req, res) => {
  users
    .find()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => res.send(err));
});

module.exports = router;
