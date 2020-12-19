var connection = require("../connection");
const Schema = connection.Schema;
const CategorysSchema = new Schema({
  category_type: {
    type: String,
    required: true,
    unique: true,
  },
});
const CategoryModel = connection.model("categories", CategorysSchema);
module.exports = CategoryModel;
