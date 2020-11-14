var connection = require("../connection");
const Schema = connection.Schema;
const UserTypessSchema = new Schema({
  user_type: {
    type: String,
    required: true,
  },
  type_num: {
    type: Number,
    required: true,
  },
});
const UserTypesModel = connection.model("UserTypes", UserTypessSchema);
module.exports = UserTypesModel;
