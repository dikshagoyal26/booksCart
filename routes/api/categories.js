const express = require("express");
const CategoryRouter = express.Router();

const categoryOperations = require("../../db/helpers/categoryCrud");

CategoryRouter.get("/fetch", (req, res) => {
  categoryOperations.listCategories(res);
});
CategoryRouter.post("/add", (req, res) => {
  if (!req.body) {
    res.status(400).send();
    return;
  }
  const category = req.body.category || "";
  if (!category) {
    response.status(400).send("Category Value Required");
    return;
  }
  categoryOperations.addCategory(category, res);
});
CategoryRouter.post("/addMultiple", (req, res) => {
  if (!req.body) {
    res.status(400).send();
    return;
  }
  const categories = req.body.categories || [];
  if (!categories || categories.length == 0) {
    response.status(400).send("Categories Value Required");
    return;
  }
  categoryOperations.addMultipleCategories(categories, res);
});
module.exports = CategoryRouter;
