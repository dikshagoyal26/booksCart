const express = require("express");
const userRouter = express.Router();
const userOperations = require("../../db/helpers/userCrud");
/**
 * @swagger
 * definitions:
 *   User:
 *     properties:
 *       _id:
 *         type: string
 *       firstName:
 *         type: string
 *       lastName:
 *         type: string
 *       userName:
 *         type: string
 *       password:
 *         type: string
 *       gender:
 *         type: string
 *       user_type:
 *         type: string
 */

/**
 * @swagger
 * /user/login:
 *   post:
 *     tags:
 *       - User
 *     summary : Login to the application
 *     parameters:
 *       - name: UserName
 *         in: body
 *         required: true
 *         type: string
 *       - name: Password
 *         in: body
 *         required: true
 *         type: string
 *     requestBody:
 *       description:
 *       content:
 *          application/json :
 *              schema:
 *               $ref: '#/definitions/User'
 *          text/json:
 *               schema:
 *                 $ref: '#/definitions/User'
 *     responses:
 *        200 :
 *          description: Success
 *          schema:
 *            $ref: '#/definitions/User'
 *        400 :
 *          description: Invalid Data
 */
userRouter.post("/login", (req, res) => {
  if (!req.body) {
    res.status(400).send();
    return;
  }
  let user = req.body;
  if (!user.userName || !user.password) {
    res.status(400).send("Invalid Data");
    return;
  }
  userOperations.loginUser(user, res);
});
/**
 * @swagger
 * /user/register:
 *   post:
 *     tags:
 *       - User
 *     summary : Register to the application
 *     parameters:
 *       - name: UserName
 *         in: body
 *         required: true
 *         type: string
 *       - name: Password
 *         in: body
 *         required: true
 *         type: string
 *       - name: firstname
 *         in: body
 *         required: true
 *         type: string
 *       - name: lastname
 *         in: body
 *         required: true
 *         type: string
 *       - name: gender
 *         in: body
 *         required: true
 *         type: string
 *     requestBody:
 *       description:
 *       content:
 *          application/json :
 *              schema:
 *               $ref: '#/definitions/User'
 *          text/json:
 *               schema:
 *                 $ref: '#/definitions/User'
 *     responses:
 *        200 :
 *          description: Success
 *          schema:
 *            $ref: '#/definitions/User'
 *        400 :
 *          description: Invalid Data
 */
userRouter.post("/register", (req, res) => {
  if (!req.body) {
    res.status(400).send();
    return;
  }
  let user = req.body;
  userOperations.registerUser(user, res);
});

/**
 * @swagger
 * /user/validate-username:
 *   get:
 *     tags:
 *       - User
 *     summary : Username Validation for unique
 *     parameters:
 *       - name: UserName
 *         in: query
 *         required: true
 *         type: string
 *     responses:
 *        200 :
 *          description: Success
 *        400 :
 *          description: Not Available or Invalid username
 */

userRouter.get("/validate-username", (req, res) => {
  if (!req.query) {
    res.status(400).send();
    return;
  }
  let username = req.query.username;
  if (!username) {
    res.status(400).send("Invalid Data");
    return;
  }
  userOperations.validateUsername(username, res);
});
module.exports = userRouter;
