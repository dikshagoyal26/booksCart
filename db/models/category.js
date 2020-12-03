var connection = require("../connection");
const Schema = connection.Schema;
const CategorysSchema = new Schema({
  category_type: {
    type: String,
    required: true,
    unique: true,
  },
});
const CategoryModel = connection.model("Categories", CategorysSchema);
module.exports = CategoryModel;

// Horror;
// Romance,
// Fiction;
// Fantasy;
// Detective & Mystery;
// Comic;
// Action;
// Business;
// Tech;
// Cooking;
// Health & Fitness;
// Travel;
// Medical;
// Biographies;
