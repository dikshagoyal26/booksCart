const express = require("express");
const CartRouter = express.Router();
const cartOperations = require("../../db/helpers/cartCrud");

/**
 * @swagger
 * definitions:
 *   CartItems:
 *     properties:
 *       book:
 *         $ref: '#/definitions/Book'
 *       quantity:
 *         type: number
 */

/**
 * @swagger
 * /cart/getItems/${userId}:
 *   get:
 *      tags:
 *         - Cart
 *      summary : Fetch Cart Items
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
 *              $ref: '#/definitions/Cart'
 */

CartRouter.get("/getItems/:userId", (req, res) => {
  const userId = req.params.userId;
  if (!userId) {
    response.status(400).send("Invalid Data");
    return;
  }
  cartOperations.fetchItems(userId, res);
});

/**
 * @swagger
 * /cart/add/${userId}/${bookId}:
 *   post:
 *     tags:
 *       - Cart
 *     summary : Add Book To Cart
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

CartRouter.post("/add/:userId/:bookId", (req, res) => {
  const userId = req.params.userId;
  const bookId = req.params.bookId;
  if (!userId) {
    response.status(400).send("Invalid Data");
    return;
  }
  cartOperations.addItem(userId, bookId, res);
});

/**
 * @swagger
 * /cart/reduce-qty/${userId}/${bookId}:
 *   put:
 *     tags:
 *       - Cart
 *     summary : Reduce Book Quantity In Cart
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

CartRouter.put("/reduce-qty/:userId/:bookId", (req, res) => {
  const userId = req.params.userId;
  const bookId = req.params.bookId;
  if (!userId) {
    response.status(400).send("Invalid Data");
    return;
  }
  cartOperations.deleteOneItemQunatity(userId, bookId, res);
});

/**
 * @swagger
 * /cart/detele-item/${userId}/${bookId}:
 *   delete:
 *     tags:
 *       - Cart
 *     summary : Delete Book from Cart
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

CartRouter.delete("/delete-item/:userId/:bookId", (req, res) => {
  const userId = req.params.userId;
  const bookId = req.params.bookId;
  if (!userId) {
    response.status(400).send("Invalid Data");
    return;
  }
  cartOperations.deleteItem(userId, bookId, res);
});

/**
 * @swagger
 * /cart/clear/${userId}:
 *   delete:
 *     tags:
 *       - Cart
 *     summary : Clear Cart
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

CartRouter.delete("/clear/:userId", (req, res) => {
  const userId = req.params.userId;
  if (!userId) {
    response.status(400).send("Invalid Data");
    return;
  }
  cartOperations.clearCart(userId, res);
});

module.exports = CartRouter;
