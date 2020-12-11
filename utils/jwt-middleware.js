const jwtOperations = require("./jwt");

function checkToken(req, res, next) {
  const token = req.headers["auth-token"];
  if (token) {
    const isValidToken = jwtOperations.verifyToken(token);
    if (isValidToken) {
      next();
    } else {
      res.status(401).json({
        status: "E",
        message: "Session Expired",
      });
    }
  } else {
    res.status(401).json({
      status: "E",
      message: "You are not authorised to access this page",
    });
  }
}
