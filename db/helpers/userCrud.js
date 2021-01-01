const UserModel = require("../models/user");
const encryptOperations = require("../../utils/encrypt");
const jwtOperations = require("../../utils/jwt");
const UserTypesModel = require("../models/user_type");
const wishlistOperations = require("./wishlistCrud");
const { getRandomId } = require("../../utils/get-random");
const userOperations = {
  loginUser(user, response) {
    user.userName = user.userName.toLowerCase();
    UserModel.findOne({ userName: user.userName })
      .populate({ path: "user_type", model: UserTypesModel })
      .exec((err, data) => {
        if (err) {
          console.log("Error while logging in user", err);
          response.status(500).send("User Not logged in due to Error");
        } else {
          if (
            data &&
            encryptOperations.comparePassword(user.password, data.password)
          ) {
            const token = jwtOperations.generateToken(
              data._id,
              data.firstName,
              user.userName,
              data.user_type.user_type
            );
            response.status(200).send({ token });
          } else {
            response.status(400).send("Invalid Username or password");
          }
        }
      });
  },
  registerUser(user, response) {
    user.userName = user.userName.toLowerCase();
    user._id = getRandomId(10);
    if (user.password)
      user.password = encryptOperations.encryptPassword(user.password);
    UserModel.create(user, (err) => {
      if (err) {
        response.status(500).send("User Not Added Due to Error");
      } else {
        wishlistOperations.createWishlist(user._id, response);
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
