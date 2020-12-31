const OrderModel = require("../models/orders");
const { getRandomOrderId } = require("../../utils/get-random");
const cartOperations = require("./cartCrud");

const orderOperations = {
  fetchOrders(user_id, response) {
    OrderModel.find({ user_id })
      .populate("items.book")
      .exec(function (err, data) {
        if (err) response.status(500).send();
        else response.status(200).send(data);
      });
  },
  addOrder(order, response) {
    let id = getRandomOrderId(7);
    order._id = id;
    OrderModel.create(order, (err) => {
      console.log(err);
      if (err) {
        response.status(500).send("order Not Added Due to Error");
      } else {
        cartOperations.clearCart(order.user_id, response);
      }
    });
  },
};

module.exports = orderOperations;
