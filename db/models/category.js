var connection = require("../connection");
const Schema = connection.Schema;
const CategorysSchema = new Schema({
 cat_type: {
    type: String,
    required:true 
  }
});
const CategoryModel = connection.model("Categories", CategorysSchema);
module.exports = CategoryModel;