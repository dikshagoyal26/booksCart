const express = require("express");
const booksRouter = express.Router();
const booksCrud = require("../../db/helpers/booksCrud");
var multer = require("multer");
const path = require("path");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + "../../../uploads/");
  },
  filename: function (req, file, cb) {
    console.log({ file });
    const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1e5);
    cb(null, file.originalname);
  },
});
var uploadCoverImage = multer({ storage: storage }).single("cover");

booksRouter.post("/add", (req, res) => {
  uploadCoverImage(req, res, (err) => {
    if (err) {
      console.log({ err });
      res.status(500).send("Server Error!");
    } else {
      const json = req.body;
      console.log({ json });
      if (!json) {
        res.status(400).send("Invalid Data");
        return;
      }
      if (req.file) {
        json.cover = req.file.filename;
      }
      console.log(json);
      booksCrud.addBook(json, res);
    }
  });
});

booksRouter.post("/update/:bookId", (req, res) => {
  const bookId = req.params.bookId;
  uploadCoverImage(req, res, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send("Server Error!");
    } else {
      const book = req.body;
      console.log({ book, bookId });
      if (!book || !bookId) {
        res.status(400).send("Invalid Data");
        return;
      }
      if (req.file) book.cover = req.file.filename;
      booksCrud.editBook(bookId, book, res);
    }
  });
});

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

booksRouter.delete("/delete/:id", (req, res) => {
  const book = req.params.id;
  booksCrud.deleteBookById(book, res);
});

module.exports = booksRouter;
