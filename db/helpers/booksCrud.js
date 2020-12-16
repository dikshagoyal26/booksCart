const getRandomId = require("../../utils/get-random");
const BooksModel = require("../models/books"); //Schema

const bookOperations = {
  addBook(booksObject, response) {
    let id = getRandomId(7);
    console.log(id);
    booksObject._id = id + "_book";
    BooksModel.create(booksObject, (err) => {
      if (err) {
        response.status(500).send("Book Not Added Due to Error");
      } else {
        response.status(200).send();
      }
    });
  },
  editBook(bookId, booksObject, response) {
    console.log({ bookId, booksObject });
    BooksModel.updateOne(
      { _id: bookId },
      { $set: booksObject },
      (err, data) => {
        if (err) {
          console.log(err);
          response.status(500).send("Book Not Updated Due to Error");
        } else {
          response.status(200).send();
        }
      }
    );
  },
  fetchBooks(response) {
    BooksModel.find({})
      .populate("category")
      .exec(function (err, data) {
        if (err) {
          response.status(500).send("Error while listing books : " + err);
        } else {
          response.status(200).send(data);
        }
      });
  },
  fetchBookById(bookId, response) {
    BooksModel.findOne({ _id: bookId })
      .populate("category")
      .exec(function (err, data) {
        if (err) {
          response.status(500).send("Error while listing books : " + err);
        } else {
          response.status(200).send(data);
        }
      });
  },
  searchByCategory(category, response) {
    BooksModel.find({ category })
      .populate("category")
      .exec(function (err, data) {
        if (err) {
          response.status(500).send("Error while listing books : " + err);
        } else {
          response.status(200).send(data);
        }
      });
  },
  searchByTitle(title, response) {
    BooksModel.find({ title })
      .populate("category")
      .exec(function (err, data) {
        if (err) {
          response.status(500).send("Error while listing books : " + err);
        } else {
          response.status(200).send(data);
        }
      });
  },
  deleteBookById(book, response) {
    BooksModel.remove({ _id: book }, (err) => {
      if (err) {
        response.status(500).send("Error while deleting book : " + err);
      } else {
        response.status(200).send();
      }
    });
  },
};
module.exports = bookOperations;
