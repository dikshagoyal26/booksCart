const getRandomId = require("../../utils/get-random");
const BooksModel = require("../models/books"); //Schema

const bookOperations = {
  addBook(booksObject, response) {
    let id = getRandomId(7);
    console.log(id);
    booksObject._id = id + "_book";
    BooksModel.create(booksObject, (err) => {
      if (err) {
        console.log("Error in Book Add", err);
        response.status(500).json({
          status: "E",
          message: "Book Not Added Due to Error" + err,
        });
      } else {
        console.log("Book Added..");
        response.status(200).json({
          status: "S",
          message: "Book Added",
        });
      }
    });
  },
  editBook(bookId, booksObject, response) {
    BooksModel.updateOne({ _id: bookId }, { $set: booksObject }, (err) => {
      if (err) {
        console.log("Error in Book Update", err);
        response.status(500).json({
          status: "E",
          message: "Book Not Updated Due to Error" + err,
        });
      } else {
        console.log("Book Updated..");
        response.status(200).json({
          status: "S",
          message: "Book Updated",
        });
      }
    });
  },
  fetchBooks(response) {
    BooksModel.find({}, (err, data) => {
      if (err) {
        console.log("Error in books Search", err);
        response.status(500).json({
          status: "E",
          message: "Error while listing books : " + err,
        });
      } else {
        console.log("books Found..");
        response.status(200).json({
          status: "S",
          message: "books Found..",
          record: data,
        });
      }
    });
  },
  fetchBookById(bookId, response) {
    BooksModel.find({ _id: bookId }, (err, data) => {
      if (err) {
        console.log("Error in book Search", err);
        response.status(500).json({
          status: "E",
          message: "Error while listing book : " + err,
        });
      } else {
        console.log("book Found..");
        response.status(200).json({
          status: "S",
          message: "book Found..",
          record: data,
        });
      }
    });
  },
};
module.exports = bookOperations;
