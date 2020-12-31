var connection = require("../connection");
const Schema = connection.Schema;
const cartItems = require("./cartItems");

const Address = new Schema({
  name: {
    type: String,
    required: true,
  },
  line_1: {
    type: String,
    required: true,
  },
  line_2: {
    type: String,
    required: true,
  },
  pincode: {
    type: Number,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
});

const OrdersSchema = new Schema({
  _id: {
    type: String,
    required: true,
  },
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
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  address: {
    type: Address,
    required: true,
  },
});
const OrderModel = connection.model("orders", OrdersSchema);
module.exports = OrderModel;
