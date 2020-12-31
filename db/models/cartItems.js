var connection = require("../connection");
const Schema = connection.Schema;
const cartItems = new Schema({
  book: {
    type: String,
    ref: "Books",
  },
  quantity: {
    type: Number,
  },
});
module.exports = cartItems;
