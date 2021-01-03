const express = require("express");
const booksRouter = express.Router();
const booksCrud = require("../../db/helpers/booksCrud");

booksRouter.get("/fetch", (req, res) => {
  let query = req.query;
  if (!!query && (query.price || query.category || query.item)) {
    booksCrud.searchByFilter(req.query, res);
  } else {
    booksCrud.fetchBooks(res);
  }
});

booksRouter.get("/fetch/:id", (req, res) => {
  const book = req.params.id;
  booksCrud.fetchBookById(book, res);
});

module.exports = booksRouter;
