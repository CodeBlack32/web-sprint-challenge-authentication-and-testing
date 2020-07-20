const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const checkUse = require("../auth/check-use-middleware");
const authenticate = require("../auth/authenticate-middleware.js");
const authRouter = require("../auth/auth-router.js");
const jokesRouter = require("../jokes/jokes-router.js");
const usersRouter = require("../users/users-router");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/api/auth", authRouter);
server.use("/api/users", checkUse, usersRouter);
server.use("/api/jokes", authenticate, jokesRouter);

server.get("/", (req, res) => {
    const payload = {
        subject: "AdminUser",
        userid: "jblack",
        hobby: "writing"
    }

    const secret = "sprintSecret"
    const options = {
        expiresIn = "30d"
    }
    const token = jwt.sign(payload, secret, options)
    
    res.json(token)
});

module.exports = server;
