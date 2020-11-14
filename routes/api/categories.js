const express = require("express");
const CategoryRouter = express.Router();

const categoryOperations = require("../../db/helpers/categoryCrud");

CategoryRouter.get("/fetch", (req,res) => {
  categoryOperations.listCategories(res);
});
CategoryRouter.post("/add", (req,res) => {
  const category = req.body && req.body.category ? req.body.category : "";
  categoryOperations.addCategory(category, res);
});
CategoryRouter.post("/addMultiple", (req,res) => {
  const categories = req.body && req.body.categories ? req.body.categories : [];
  categoryOperations.addMultipleCategories(categories, res);
});
module.exports = CategoryRouter;
