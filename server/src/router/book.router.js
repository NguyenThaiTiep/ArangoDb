const express = require("express");
const bookController = require("../controllers/book.controller");
const bookRouter = express.Router();
bookRouter
  .get("/", bookController.getAll)
  .get("/add", bookController.add)
  .get("/seed", bookController.seed)
  .get("/removeAll", bookController.removeAll)
  .get("/count", bookController.count)
  .get("/in", bookController.findByCategory);
module.exports = bookRouter;
