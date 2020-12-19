var connection = require("../connection");
const Schema = connection.Schema;
const UserTypessSchema = new Schema({
  _id: {
    type: Number,
    required: true,
    enum: [0, 1],
  },
  user_type: {
    type: String,
    required: true,
    enum: ["admin", "user"],
  },
});
const UserTypesModel = connection.model("UserTypes", UserTypessSchema);
module.exports = UserTypesModel;
