const CategoryModel = require("../models/category");
const categoryOperations = {
  listCategories(response) {
    CategoryModel.find({}, (err, data) => {
      if (err) {
        response.status(500).send("Error while listing categories : " + err);
      } else {
        response.status(200).send(data);
      }
    });
  },
  addCategory(category, response) {
    if (category) {
      category = category.toLowerCase();
      CategoryModel.create({ category_type: category }, (err) => {
        if (err) {
          response.status(500).send("Category Not Added Due to Error : " + err);
        } else {
          response.status(200).send();
        }
      });
    } else {
      response.status(400).send("Category Value Required");
    }
  },
  addMultipleCategories(categories, response) {
    if (typeof categories == "string") {
      this.addCategory(categories, response);
      return;
    }
    let insertCat = [];
    categories.forEach((category) => {
      insertCat.push({ category_type: category.toLowerCase() });
    });
    if (insertCat.length > 0) {
      CategoryModel.insertMany(insertCat, (err, data) => {
        if (err) {
          response
            .status(500)
            .send("Categories Not Added Due to Error : " + err);
        } else {
          response.status(200).send(data);
        }
      });
    } else {
      response.status(400).send("Category Value Required");
    }
  },
};
module.exports = categoryOperations;
