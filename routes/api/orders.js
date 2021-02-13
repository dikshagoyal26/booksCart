const express = require("express");
const OrderRouter = express.Router();
const orderOperations = require("../../db/helpers/ordersCrud");

/**
 * @swagger
 * definitions:
 *   Address:
 *     properties:
 *       name:
 *         type: string
 *       line_1:
 *         type: string
 *       line_2:
 *         type: string
 *       pincode:
 *         type: string
 *       state:
 *         type: string
 */

/**
 * @swagger
 * definitions:
 *   Order:
 *     properties:
 *       _id:
 *         type: string
 *       user_id:
 *         type: string
 *       created_at:
 *         type: date
 *       items:
 *          type: array
 *          items:
 *             $ref: '#/definitions/CartItems'
 *       total:
 *          type: number
 *       Address:
 *          $ref: '#/definitions/Address'
 */

/**
 * @swagger
 * /orders/fetch/${userId}:
 *   get:
 *     tags:
 *       - Orders
 *     summary : Get Orders for User
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

OrderRouter.get("/fetch/:userId", (req, res) => {
  const userId = req.params.userId;
  if (!userId) {
    res.status(400).send("Invalid Data");
    return;
  }
  orderOperations.fetchOrders(userId, res);
});

/**
 * @swagger
 * /orders/add/${userId}:
 *   post:
 *     tags:
 *       - Orders
 *     summary : Get Orders for User
 *     parameters:
 *       - name: User Id
 *         in: path
 *         required: true
 *         type: string
 *       - name: Items
 *         in: body
 *         required: true
 *         type: array
 *         items:
 *           $ref: '#/definitions/Book'
 *       - name: Total Amount
 *         in: body
 *         required: true
 *         type: string
 *     requestBody:
 *       description:
 *       content:
 *          application/json :
 *              schema:
 *               $ref: '#/definitions/Order'
 *          text/json:
 *               schema:
 *                 $ref: '#/definitions/Order'
 *     responses:
 *        200 :
 *          description: Success
 *        400 :
 *          description: Invalid Data
 */

OrderRouter.post("/add/:userId", (req, res) => {
  const userId = req.params.userId;
  const order = req.body;
  if (!userId || !order) {
    res.status(400).send("Invalid Data");
    return;
  }
  order.user_id = userId;
  orderOperations.addOrder(order, res);
});

module.exports = OrderRouter;
