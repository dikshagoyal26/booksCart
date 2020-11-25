const CategoryModel = require("../models/category");
const categoryOperations = {
  listCategories(response) {
    CategoryModel.find({}, (err, data) => {
      if (err) {
        console.log("Error in Categories Search", err);
        response.status(500).json({
          status: "E",
          message: "Error while listing categories : " + err,
        });
      } else {
        console.log("Categories Found..");
        response.status(200).json({
          status: 200,
          message: "Categories Found..",
          record: data,
        });
      }
    });
  },
  addCategory(category, response) {
    if (category) {
      category = category.toLowerCase();
      CategoryModel.create({ cat_type: category }, (err) => {
        if (err) {
          console.log("Error in Category Add", err);
          response.status(500).json({
            status: "E",
            message: "Category Not Added Due to Error : " + err,
          });
        } else {
          console.log("Category Added..");
          response.status(200).json({
            status: 200,
            message: "Category Added",
          });
        }
      });
    } else {
      response.status(400).json({
        status: "E",
        message: "Category Value Required",
      });
    }
  },
  addMultipleCategories(categories, response) {
    if (typeof categories == "string") {
      this.addCategory(categories, response);
      return;
    }
    let insertCat = [];
    categories.forEach((category) => {
      insertCat.push({ cat_type: category.toLowerCase() });
    });
    if (insertCat.length > 0) {
      CategoryModel.insertMany(insertCat, (err, data) => {
        if (err) {
          console.log("Error in Categories Add", err);
          response.status(500).json({
            status: "E",
            message: "Categories Not Added Due to Error : " + err,
          });
        } else {
          console.log("Categories Added..");
          response.status(200).json({
            status: 200,
            message: "Categories Added",
            record: data,
          });
        }
      });
    } else {
      response.status(400).json({
        status: "E",
        message: "Category Value Required",
      });
    }
  },
};
module.exports = categoryOperations;
