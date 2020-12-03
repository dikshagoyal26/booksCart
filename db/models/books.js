var connection = require("../connection");
const Schema = connection.Schema;
const BooksSchema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    unique: true,
  },
  author: {
    type: String,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  cover: {
    type: String,
    default: "https://www.forewordreviews.com/books/covers/not-for-profit.jpg",
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  availability: {
    type: Boolean,
    default: true,
  },
});
const BooksModel = connection.model("Books", BooksSchema);
module.exports = BooksModel;
