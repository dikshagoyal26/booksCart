const UserModel = require("../models/user");
const encryptOperations = require("../../utils/encrypt");
const jwtOperations = require("../../utils/jwt");
const userOperations = {
  loginUser(user, response) {
    UserModel.find({ userName: user.userName }, (err, data) => {
      console.log({ err, data });
      if (err) {
        console.log("Error while logging in user", err);
        response.status(500).send("User Not logged in due to Error");
      } else {
        if (
          data &&
          data.length > 0 &&
          encryptOperations.comparePassword(user.password, data[0].password)
        ) {
          const token = jwtOperations.generateToken(
            data[0]._id,
            user.userName,
            data[0].user_type
          );
          response.status(200).send({ token });
        } else {
          response.status(400).send("Invalid Username or password");
        }
      }
    });
  },
  registerUser(user, response) {
    if (user.password)
      user.password = encryptOperations.encryptPassword(user.password);
    UserModel.create(user, (err) => {
      if (err) {
        response.status(500).send("User Not Added Due to Error");
      } else {
        response.status(200).send();
      }
    });
  },
  validateUsername(userName, response) {
    UserModel.find({ userName }, (err, data) => {
      if (err) {
        response.status(500).send("Username Not Validated Due to Error");
      } else {
        if (data && data.length > 0) {
          response.status(400).send("Username Not Available");
        } else {
          response.status(200).send();
        }
      }
    });
  },
};
module.exports = userOperations;
