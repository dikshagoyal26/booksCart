var connection = require("../connection");
const Schema = connection.Schema;
const CartSchema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
    unique: true,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  items: {
    type: cartItems,
  },
});
const cartItems = new Schema({
  product_id: {
    type: String,
    ref: "books",
  },
  quantity: {
    type: Number,
  },
});
const CartsModel = connection.model("Carts", CartSchema);
module.exports = CartsModel;
