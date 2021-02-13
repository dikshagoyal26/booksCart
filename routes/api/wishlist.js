const express = require("express");
const WishlistRouter = express.Router();
const wishlistOperations = require("../../db/helpers/wishlistCrud");

/**
 * @swagger
 * definitions:
 *   Wishlist:
 *     properties:
 *       _id:
 *         type: string
 *       user_id:
 *         type: string
 *       books:
 *          type: array
 *          items:
 *             $ref: '#/definitions/Book'
 */

/**
 * @swagger
 * /wishlist/fetch/${userId}:
 *   get:
 *      tags:
 *         - Wishlist
 *      summary : Fetch Wishlist
 *      parameters:
 *         - name: User Id
 *           in: path
 *           required: true
 *           type: string
 *      responses:
 *        200:
 *           description: Success
 *           schema:
 *              type: array
 *              $ref: '#/definitions/Wishlist'
 */
WishlistRouter.get("/fetch/:userId", (req, res) => {
  const userId = req.params.userId;
  if (!userId) {
    res.status(400).send("Invalid Data");
    return;
  }
  wishlistOperations.fetchWishlistedItems(userId, res);
});

/**
 * @swagger
 * /wishlist/add/${userId}/${bookId}:
 *   post:
 *     tags:
 *       - Wishlist
 *     summary : Add Book To Wishlist
 *     parameters:
 *       - name: User Id
 *         in: path
 *         required: true
 *         type: string
 *       - name: Book Id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *        200 :
 *          description: Success
 *        400 :
 *          description: Invalid Data
 */

WishlistRouter.post("/add/:userId/:bookId", (req, res) => {
  const userId = req.params.userId;
  const bookId = req.params.bookId;
  if (!userId || !bookId) {
    res.status(400).send("Invalid Data");
    return;
  }
  wishlistOperations.addWishlistedItem(userId, bookId, res);
});

/**
 * @swagger
 * /wishlist/remove/${userId}/${bookId}:
 *   delete:
 *     tags:
 *       - Wishlist
 *     summary : Remove Book From Wishlist
 *     parameters:
 *       - name: User Id
 *         in: path
 *         required: true
 *         type: string
 *       - name: Book Id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *        200 :
 *          description: Success
 *        400 :
 *          description: Invalid Data
 */

WishlistRouter.delete("/remove/:userId/:bookId", (req, res) => {
  const userId = req.params.userId;
  const bookId = req.params.bookId;
  if (!userId || !bookId) {
    res.status(400).send("Invalid Data");
    return;
  }
  wishlistOperations.removeWishlistedItem(userId, bookId, res);
});

/**
 * @swagger
 * /wishlist/clear/${userId}:
 *   delete:
 *     tags:
 *       - Wishlist
 *     summary : Clear Wishlist
 *     parameters:
 *       - name: User Id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *        200 :
 *          description: Success
 *        400 :
 *          description: Invalid Data
 */

WishlistRouter.delete("/clear/:userId", (req, res) => {
  const userId = req.params.userId;
  if (!userId) {
    res.status(400).send("Invalid Data");
    return;
  }
  wishlistOperations.clearWishlist(userId, res);
});

module.exports = WishlistRouter;
