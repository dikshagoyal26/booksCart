const mongoose = require("mongoose");
const mongoEnv = require("../config/mongo-env");
mongoose.connect(mongoEnv.mongo, { useNewUrlParser: true });
mongoose.connection.on("open", () => {
  console.log("connection established");
});
module.exports = mongoose;