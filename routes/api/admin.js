const express = require("express");
const adminRouter = express.Router();
const booksCrud = require("../../db/helpers/booksCrud");
var multer = require("multer");
const path = require("path");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + "../../../uploads/");
  },
  filename: function (req, file, cb) {
    console.log({ file });
    const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1e5);
    cb(null, file.originalname);
  },
});
var uploadCoverImage = multer({ storage: storage }).single("cover");

/**
 * @swagger
 * /admin/book/add:
 *   post:
 *     tags:
 *       - User
 *     summary : Admin update a book
 *     parameters:
 *       - name: Title
 *         in: body
 *         required: true
 *         type: string
 *       - name: Author
 *         in: body
 *         required: true
 *         type: string
 *       - name: Category
 *         in: body
 *         required: true
 *         type: string
 *       - name: Price
 *         in: body
 *         required: true
 *         type: number
 *       - name: Image
 *         in: body
 *         required: false
 *         type: string
 *     requestBody:
 *       description:
 *       content:
 *          application/json :
 *              schema:
 *               $ref: '#/definitions/Book'
 *          text/json:
 *               schema:
 *                 $ref: '#/definitions/Book'
 *     responses:
 *        200 :
 *          description: Success
 *        400 :
 *          description: Invalid Data
 */

adminRouter.post("/book/add", (req, res) => {
  uploadCoverImage(req, res, (err) => {
    if (err) {
      console.log({ err });
      res.status(500).send("Server Error!");
    } else {
      const json = req.body;
      console.log({ json });
      if (!json) {
        res.status(400).send("Invalid Data");
        return;
      }
      if (req.file) {
        json.cover = req.file.filename;
      }
      console.log(json);
      booksCrud.addBook(json, res);
    }
  });
});

/**
 * @swagger
 * /admin/book/update/${bookId}:
 *   post:
 *     tags:
 *       - User
 *     summary : Admin update a book
 *     parameters:
 *       - name: Book Id
 *         in: path
 *         required: true
 *         type: string
 *       - name: Title
 *         in: body
 *         required: true
 *         type: string
 *       - name: Author
 *         in: body
 *         required: true
 *         type: string
 *       - name: Category
 *         in: body
 *         required: true
 *         type: string
 *       - name: Price
 *         in: body
 *         required: true
 *         type: number
 *       - name: Image
 *         in: body
 *         required: false
 *         type: string
 *     requestBody:
 *       description:
 *       content:
 *          application/json :
 *              schema:
 *               $ref: '#/definitions/Book'
 *          text/json:
 *               schema:
 *                 $ref: '#/definitions/Book'
 *     responses:
 *        200 :
 *          description: Success
 *        400 :
 *          description: Invalid Data
 */

adminRouter.post("/book/update/:bookId", (req, res) => {
  const bookId = req.params.bookId;
  uploadCoverImage(req, res, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send("Server Error!");
    } else {
      const book = req.body;
      console.log({ book, bookId });
      if (!book || !bookId) {
        res.status(400).send("Invalid Data");
        return;
      }
      if (req.file) book.cover = req.file.filename;
      booksCrud.editBook(bookId, book, res);
    }
  });
});

/**
 * @swagger
 * /admin/book/delete/${bookId}:
 *   delete:
 *     tags:
 *       - Admin
 *     summary : Delete a book
 *     parameters:
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

adminRouter.delete("/book/delete/:id", (req, res) => {
  const book = req.params.id;
  booksCrud.deleteBookById(book, res);
});
module.exports = adminRouter;
