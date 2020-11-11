const express = require("express");
const booksRouter = express.Router();

const booksCrud = require("../../db/helpers/booksCrud");

booksRouter.post("/update", (req, res) => {
  const json = req.body;
  booksCrud.addorEdit(json, res);
});

module.exports = booksRouter;
