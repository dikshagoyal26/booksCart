const express = require("express");
const booksRouter = express.Router();

const booksCrud = require("../../db/helpers/booksCrud");

booksRouter.post("/add", (req, res) => {
  const json = req.body.book;
  booksCrud.addBook(json, res);
});

booksRouter.post("/update", (req, res) => {
  const book = req.body.book;
  const json = req.body.data;
  booksCrud.editBook(book, json, res);
});

booksRouter.get("/fetch", (req, res) => {
  booksCrud.fetchBooks(res);
});

booksRouter.get("/fetch/:id", (req, res) => {
  const book = req.params.id;
  booksCrud.fetchBookById(id, res);
}); 
module.exports = booksRouter;
