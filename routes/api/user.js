const express = require("express");
const userRouter = express.Router();
const userOperations = require("../../db/helpers/userCrud");

userRouter.post("/login", (req, res) => {
  let json = req.body.user;
  userOperations.loginUser(json, res);
});
userRouter.post("/register", (req, res) => {
  let json = req.body.user;
  userOperations.registerUser(json, res);
});
userRouter.get("/validate-username", (req, res) => {
  let username = req.query.username;
  userOperations.validateUsername(username, res);
});
module.exports = userRouter;
