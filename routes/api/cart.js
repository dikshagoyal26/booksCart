const express = require("express");
const CartRouter = express.Router();
const cartOperations = require("../../db/helpers/cartCrud");
CartRouter.get("/getItems/:userId", (req, res) => {
  const userId = req.params.userId;
  cartOperations.fetchItems(userId, res);
});

CartRouter.post("/add/:userId/:bookId", (req, res) => {
  const userId = req.params.userId;
  const bookId = req.params.bookId;
  cartOperations.addItem(userId, bookId, res);
});
CartRouter.put("/delete-one/:userId/:bookId", (req, res) => {
  const userId = req.params.userId;
  const bookId = req.params.bookId;
  cartOperations.deleteOneItemQunatity(userId, bookId, res);
});
CartRouter.delete("/delete-item/:userId/:bookId", (req, res) => {
  const userId = req.params.userId;
  const bookId = req.params.bookId;
  cartOperations.deleteItem(userId, bookId, res);
});
CartRouter.delete("/clear/:userId", (req, res) => {
  const userId = req.params.userId;
  cartOperations.clearCart(userId, res);
});

module.exports = CartRouter;
