const { getRandomId } = require("../../utils/get-random");
const BooksModel = require("../models/books"); //Schema
const categoryOperations = require("./categoryCrud");
const internalBookOperations = {
  getFinalFilter(filter) {
    return new Promise(async (resolve, reject) => {
      let finalFilter = {};
      if (filter.category) {
        let category = await categoryOperations.getCategoryIdFromName(
          filter.category
        );
        finalFilter.category = category;
      }
      if (filter.item) {
        let regex = { $regex: filter.item, $options: "i" };
        finalFilter["$or"] = [{ title: regex }, { author: regex }];
      }
      if (filter.price) {
        finalFilter.price = { $lte: filter.price };
      }
      resolve(finalFilter);
    });
  },
};

const bookOperations = {
  addBook(booksObject, response) {
    let id = getRandomId(7);
    booksObject._id = id + "_book";
    console.log(booksObject);
    BooksModel.create(booksObject, (err) => {
      if (err) {
        console.log(err);
        response.status(500).send("Book Not Added Due to Error");
      } else {
        response.status(200).send();
      }
    });
  },
  editBook(bookId, booksObject, response) {
    BooksModel.updateOne({ _id: bookId }, { $set: booksObject }, (err) => {
      if (err) {
        console.log(err);
        response.status(500).send("Book Not Updated Due to Error");
      } else {
        response.status(200).send();
      }
    });
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
  async searchByFilter(filter, response) {
    const finalFilter = await internalBookOperations.getFinalFilter(filter);
    BooksModel.find(finalFilter)
      .populate("category")
      .exec(function (err, data) {
        console.log({ err, data });
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
