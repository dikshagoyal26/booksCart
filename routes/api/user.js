const express = require("express");
const userRouter = express.Router();
const userOperations = require("../../db/helpers/userCrud");
/**
 * @swagger
 * definitions:
 *   User:
 *     properties:
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
 *       - Login
 *     summary : Login to the application
 *     parameters:
 *       - name: UserName
 *         in: body
 *         required: true
 *         type: string
 *       - password: Password
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
 *       200:
 *         description: Success
 *         schema:
 *           $ref: '#/definitions/User'
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
userRouter.post("/register", (req, res) => {
  if (!req.body) {
    res.status(400).send();
    return;
  }
  let user = req.body;
  userOperations.registerUser(user, res);
});
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
