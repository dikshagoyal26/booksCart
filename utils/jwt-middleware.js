const jwtOperations = require("./jwt");

function validateToken(req, res, next) {
  const token = req.headers["authorization"];
  if (token) {
    let authToken = token.split(" ")[1];
    const isValidToken = jwtOperations.verifyToken(authToken);
    if (isValidToken) {
      next();
    } else {
      res.status(401).send("Session Expired");
    }
  } else {
    res.status(401).send("You are not authorised to access this page");
  }
}
module.exports = validateToken;
