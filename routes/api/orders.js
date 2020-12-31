const express = require("express");
const OrderRouter = express.Router();
const orderOperations = require("../../db/helpers/ordersCrud");
OrderRouter.get("/fetch/:userId", (req, res) => {
  const userId = req.params.userId;
  if (!userId) {
    res.status(400).send("Invalid Data");
    return;
  }
  orderOperations.fetchOrders(userId, res);
});

OrderRouter.post("/add/:userId", (req, res) => {
  const userId = req.params.userId;
  const order = req.body;
  console.log({ userId, order });
  if (!userId || !order) {
    res.status(400).send("Invalid Data");
    return;
  }
  order.user_id = userId;
  orderOperations.addOrder(order, res);
});

module.exports = OrderRouter;
