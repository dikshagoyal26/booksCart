const express = require("express");
const WishlistRouter = express.Router();
const wishlistOperations = require("../../db/helpers/wishlistCrud");
WishlistRouter.get("/fetch/:userId", (req, res) => {
  const userId = req.params.userId;
  if (!userId) {
    res.status(400).send("Invalid Data");
    return;
  }
  wishlistOperations.fetchWishlistedItems(userId, res);
});

WishlistRouter.post("/add/:userId/:bookId", (req, res) => {
  const userId = req.params.userId;
  const bookId = req.params.bookId;
  console.log({ userId, bookId });
  if (!userId || !bookId) {
    res.status(400).send("Invalid Data");
    return;
  }
  wishlistOperations.addWishlistedItem(userId, bookId, res);
});

WishlistRouter.delete("/remove/:userId/:bookId", (req, res) => {
  const userId = req.params.userId;
  const bookId = req.params.bookId;
  if (!userId || !bookId) {
    res.status(400).send("Invalid Data");
    return;
  }
  wishlistOperations.removeWishlistedItem(userId, bookId, res);
});

WishlistRouter.delete("/clear/:userId", (req, res) => {
  const userId = req.params.userId;
  if (!userId) {
    res.status(400).send("Invalid Data");
    return;
  }
  wishlistOperations.clearWishlist(userId, res);
});

module.exports = WishlistRouter;
