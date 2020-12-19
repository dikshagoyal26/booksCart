const express = require("express");
const CartRouter = express.Router();
const cartOperations = require("../../db/helpers/cartCrud");
CartRouter.get("/getItems/:userId", (req, res) => {
  const userId = req.params.userId;
  if (!userId) {
    response.status(400).send("Invalid Data");
    return;
  }
  cartOperations.fetchItems(userId, res);
});

CartRouter.post("/add/:userId/:bookId", (req, res) => {
  const userId = req.params.userId;
  const bookId = req.params.bookId;
  if (!userId) {
    response.status(400).send("Invalid Data");
    return;
  }
  cartOperations.addItem(userId, bookId, res);
});
CartRouter.put("/reduce-qty/:userId/:bookId", (req, res) => {
  const userId = req.params.userId;
  const bookId = req.params.bookId;
  if (!userId) {
    response.status(400).send("Invalid Data");
    return;
  }
  cartOperations.deleteOneItemQunatity(userId, bookId, res);
});
CartRouter.delete("/delete-item/:userId/:bookId", (req, res) => {
  const userId = req.params.userId;
  const bookId = req.params.bookId;
  if (!userId) {
    response.status(400).send("Invalid Data");
    return;
  }
  cartOperations.deleteItem(userId, bookId, res);
});
CartRouter.delete("/clear/:userId", (req, res) => {
  const userId = req.params.userId;
  if (!userId) {
    response.status(400).send("Invalid Data");
    return;
  }
  cartOperations.clearCart(userId, res);
});

module.exports = CartRouter;
