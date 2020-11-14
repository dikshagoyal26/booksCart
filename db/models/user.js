var connection = require("../connection");
const Schema = connection.Schema;
const UsersSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  user_type: {
    type: Number,
    required: true,
  },
});
const UsersModel = connection.model("Users", UsersSchema);
module.exports = UsersModel;
