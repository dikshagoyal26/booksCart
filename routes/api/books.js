const express = require("express");
const booksRouter = express.Router();
const booksCrud = require("../../db/helpers/booksCrud");

/**
 * @swagger
 * definitions:
 *   Book:
 *     properties:
 *       _id:
 *         type: string
 *       title:
 *         type: string
 *       author:
 *         type: string
 *       Category:
 *         type: object
 *         $ref: '#/definitions/Category'
 *       price:
 *         type: number
 *       created_at:
 *         type: date
 *       cover:
 *         type: string
 */

/**
 * @swagger
 * /books/fetch:
 *   get:
 *      tags:
 *         - Book
 *      summary : Fetch Books
 *      parameters:
 *         - name: Maximum Price
 *           in: query
 *           required: false
 *           type: number
 *         - name: Category
 *           in: query
 *           required: false
 *           type: string
 *         - name: Book Title or Author
 *           in: query
 *           required: false
 *           type: string
 *      responses:
 *        200:
 *           description: Success
 *           schema:
 *              type: array
 *              $ref: '#/definitions/Book'
 */

booksRouter.get("/fetch", (req, res) => {
  let query = req.query;
  if (!!query && (query.price || query.category || query.item)) {
    booksCrud.searchByFilter(req.query, res);
  } else {
    booksCrud.fetchBooks(res);
  }
});
/**
 * @swagger
 * /books/fetch/${id}:
 *   get:
 *      tags:
 *         - Book
 *      summary : Fetch Book By Book Id
 *      parameters:
 *         - name: Book Id
 *           in: path
 *           required: true
 *           type: string
 *      responses:
 *        200:
 *           description: Success
 *           schema:
 *              $ref: '#/definitions/Book'
 */

booksRouter.get("/fetch/:id", (req, res) => {
  const book = req.params.id;
  booksCrud.fetchBookById(book, res);
});

module.exports = booksRouter;
