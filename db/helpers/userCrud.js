const UserModel = require("../models/user");
const encryptOperations = require("../../utils/encrypt");
const userOperations = {
  loginUser(user, response) {
    UserModel.find({ userName: user.userName }, (err, data) => {
      if (err) {
      } else {
        if (data) {
          //check for password
        } else {
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
          status: "E",
          message: "User Not Added Due to Error" + err,
        });
      } else {
        console.log("User Added..");
        response.status(200).json({
          status: 200,
          message: "User Added",
        });
      }
    });
  },
  validateUsername(userName, response) {
    UserModel.find({ userName }, (err, data) => {
      if (err) {
      } else {
        if (data) {
        } else {
        }
      }
    });
  },
};
module.exports = userOperations;
