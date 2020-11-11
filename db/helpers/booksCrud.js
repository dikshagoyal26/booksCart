const getRandomId = require("../../utils/get-random");
const BooksModel = require("../models/books"); //Schema

const bookOperations = {
  addorEdit(booksObject, response) {
    BooksModel.findOne({ title: booksObject.title }, (err, book) => {
      if (err) {
        console.log("Error in Book Add/Update", err);
        response.status(500).json({
          status: "E",
          message: "Book Not Added/Updated Due to Error" + err,
        });
      } else {
        if (book) {
          BooksModel.updateOne(
            { _id: book._id },
            { $set: booksObject },
            (err) => {
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
            }
          );
        } else {
          let id = getRandomId(7);
          console.log(id)
          booksObject._id = id + '_book';
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
        }
      }
    });
  },
};
module.exports = bookOperations;
