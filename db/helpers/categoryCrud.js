const CategoryModel = require("../models/category");
const categoryOperations = {
  listCategories(response) {
    CategoryModel.find({}, (err, data) => {
      if (err)
        response.status(500).send("Error while listing categories : " + err);
      else response.status(200).send(data);
    });
  },
  addCategory(category, response) {
    category = category.toLowerCase();
    CategoryModel.create({ category_type: category }, (err) => {
      if (err)
        response.status(500).send("Category Not Added Due to Error : " + err);
      else response.status(200).send();
    });
  },
  addMultipleCategories(categories, response) {
    let insertCat = categories.map((category) => {
      return { category_type: category.toLowerCase() };
    });
    CategoryModel.insertMany(insertCat, (err, data) => {
      if (err)
        response.status(500).send("Categories Not Added Due to Error : " + err);
      else response.status(200).send(data);
    });
  },
};
module.exports = categoryOperations;
