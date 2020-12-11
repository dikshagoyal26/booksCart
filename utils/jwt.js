const jwt = require("jsonwebtoken");
const jwtOperations = {
  secret: "@My$ecretKey",
  generateToken(userName) {
    var token = jwt.sign({ userName }, this.secret, { expiresIn: "7d" });
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
