const jwt = require("jsonwebtoken");
const jwtOperations = {
  secret: "@My$ecretKey",
  generateToken(userName, userType = 1) {
    //TODO:How to Refresh Token?
    var token = jwt.sign({ userName, userType }, this.secret, {
      expiresIn: "24h",
    });
    return token;
  },
  verifyToken(token) {
    try {
      var decoded = jwt.verify(token, this.secret);
      if (decoded) return true;
      else return false;
    } catch (e) {
      return false;
    }
  },
};
module.exports = jwtOperations;
