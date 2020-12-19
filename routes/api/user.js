const express = require("express");
const userRouter = express.Router();
const userOperations = require("../../db/helpers/userCrud");

userRouter.post("/login", (req, res) => {
  if (!req.body) {
    res.status(400).send();
    return;
  }
  let user = req.body;
  if (!user.userName || !user.password) {
    res.status(400).send("Invalid Data");
    return;
  }
  userOperations.loginUser(user, res);
});
userRouter.post("/register", (req, res) => {
  if (!req.body) {
    res.status(400).send();
    return;
  }
  let user = req.body;
  userOperations.registerUser(user, res);
});
userRouter.get("/validate-username", (req, res) => {
  if (!req.query) {
    res.status(400).send();
    return;
  }
  let username = req.query.username;
  if (!userName) {
    response.status(400).send("Invalid Data");
    return;
  }
  userOperations.validateUsername(username, res);
});
module.exports = userRouter;
