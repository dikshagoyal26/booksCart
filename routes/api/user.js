const express = require("express");
const userRouter = express.Router();
const userOperations = require("../../db/helpers/userCrud");

userRouter.post("/login", (req, res) => {});
userRouter.post("/register", (req, res) => {
  let json = req.body.user;
  userOperations.registerUser(json, res);
});
userRouter.post("/validate-username", (req, res) => {});
module.exports = userRouter;
