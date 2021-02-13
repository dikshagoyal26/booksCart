const express = require("express");
const CategoryRouter = express.Router();

const categoryOperations = require("../../db/helpers/categoryCrud");

/**
 * @swagger
 * definitions:
 *   Category:
 *     properties:
 *       _id:
 *         type: string
 *       category_type:
 *         type: string
 */

/**
 * @swagger
 * /category/fetch:
 *   get:
 *      tags:
 *         - Category
 *      summary : Fetch Categories
 *      responses:
 *        200:
 *           description: Success
 *           schema:
 *              type: array
 *              $ref: '#/definitions/Category'
 */

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
