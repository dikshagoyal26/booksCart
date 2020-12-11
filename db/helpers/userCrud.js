const UserModel = require("../models/user");
const encryptOperations = require("../../utils/encrypt");
const jwtOperations = require("../../utils/jwt");
const userOperations = {
  loginUser(user, response) {
    UserModel.find({ userName: user.userName }, (err, data) => {
      if (err) {
        console.log("Error while logging in user", err);
        response.status(500).json({
          status: 500,
          message: "User Not logged in due to Error" + err,
        });
      } else {
        if (data && data.length > 0) {
          if (
            encryptOperations.comparePassword(user.password, data[0].password)
          ) {
            const token = jwtOperations.generateToken(user.userName);
            response.status(200).json({
              status: 200,
              message: "User Logged in",
              token: token,
              user: user.userName,
            });
          } else {
            response.status(400).json({
              status: 400,
              message: "Invalid Username or password",
            });
          }
        } else {
          response.status(400).json({
            status: 400,
            message: "Invalid Username or password",
          });
        }
      }
    });
  },
  registerUser(user, response) {
    if (user.password)
      user.password = encryptOperations.encryptPassword(user.password);
    UserModel.create(user, (err) => {
      if (err) {
        console.log("Error in User Add", err);
        response.status(500).json({
          status: 500,
          message: "User Not Added Due to Error" + err,
        });
      } else {
        console.log("User Added..");
        const token = jwtOperations.generateToken(user.userName);
        response.status(200).json({
          status: 200,
          message: "User Added",
          token: token,
          user: user.userName,
        });
      }
    });
  },
  validateUsername(userName, response) {
    UserModel.find({ userName }, (err, data) => {
      if (err) {
        console.log("Error in Validating Username", err);
        response.status(500).json({
          status: 500,
          message: "Username Not Validated Due to Error" + err,
        });
      } else {
        if (data) {
          response.status(400).json({
            status: 400,
            message: "Invalid Username or password",
          });
        } else {
          response.status(200).json({ status: "S" });
        }
      }
    });
  },
};
module.exports = userOperations;
