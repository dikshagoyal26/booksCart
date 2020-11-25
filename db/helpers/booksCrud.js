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
          status: 200,
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
          status: 200,
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
          status: 200,
          message: "books Found..",
          record: data,
        });
      }
    });
  },
  fetchBookById(bookId, response) {
    BooksModel.findOne({ _id: bookId }, (err, data) => {
      if (err) {
        console.log("Error in book Search", err);
        response.status(500).json({
          status: "E",
          message: "Error while listing book : " + err,
        });
      } else {
        console.log("book Found..");
        response.status(200).json({
          status: 200,
          message: "book Found..",
          record: [data],
        });
      }
    });
  },
  searchByCategory(category, response) {
    BooksModel.find({ category }, (err, data) => {
      if (err) {
        console.log("Error in books Search", err);
        response.status(500).json({
          status: "E",
          message: "Error while listing book : " + err,
        });
      } else {
        console.log("books Found..");
        response.status(200).json({
          status: 200,
          message: "books Found..",
          record: data,
        });
      }
    });
  },
  searchByTitle(title, response) {
    BooksModel.find({ title }, (err, data) => {
      if (err) {
        console.log("Error in books Search", err);
        response.status(500).json({
          status: "E",
          message: "Error while listing book : " + err,
        });
      } else {
        console.log("book Found..");
        response.status(200).json({
          status: 200,
          message: "book Found..",
          record: [data],
        });
      }
    });
  },
  deleteBookById(book, response) {
    BooksModel.remove({ _id: book }, (err) => {
      if (err) {
        console.log("Error in books Delete", err);
        response.status(500).json({
          status: "E",
          message: "Error while deleting book : " + err,
        });
      } else {
        console.log("book deleted..");
        response.status(200).json({
          status: 200,
          message: "book deleted..",
        });
      }
    });
  },
};
module.exports = bookOperations;
