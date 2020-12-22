const express = require("express");
const booksRouter = express.Router();

const booksCrud = require("../../db/helpers/booksCrud");

booksRouter.post("/add", (req, res) => {
  const json = req.body;
  if (!json) {
    res.status(400).send("Invalid Data");
    return;
  }
  console.log(json);
  if (json.cover && json.cover.trim().length == 0) {
    delete json[cover];
  }
  booksCrud.addBook(json, res);
});

booksRouter.post("/update/:bookId", (req, res) => {
  const bookId = req.query.bookId;
  const book = req.body;
  // if (!book || !bookId) {
  //   res.status(400).send("Invalid Data");
  //   return;
  // }
  console.log({ book, bookId });
  booksCrud.editBook(bookId, book, res);
});

booksRouter.get("/fetch", (req, res) => {
  if (!!req.query && !!req.query.category) {
    booksCrud.searchByCategory(req.query.category, res);
  } else if (!!req.query && !!req.query.title) {
    booksCrud.searchByCategory(req.query.title, res);
  } else {
    booksCrud.fetchBooks(res);
  }
});

booksRouter.get("/fetch/:id", (req, res) => {
  const book = req.params.id;
  booksCrud.fetchBookById(book, res);
});

booksRouter.delete("/delete/:id", (req, res) => {
  const book = req.params.id;
  booksCrud.deleteBookById(book, res);
});

module.exports = booksRouter;
