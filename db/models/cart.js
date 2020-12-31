var connection = require("../connection");
const Schema = connection.Schema;
const cartItems = require("./cartItems");
const CartSchema = new Schema({
  user_id: {
    type: String,
    required: true,
    ref: "users",
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  items: {
    type: [cartItems],
  },
});

const CartsModel = connection.model("Carts", CartSchema);
module.exports = CartsModel;
