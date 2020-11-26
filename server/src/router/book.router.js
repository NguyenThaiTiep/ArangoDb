const express = require("express");
const bookController = require("../controllers/book.controller");
const bookRouter = express.Router();
bookRouter
  .get("/", bookController.getAll)
  .post("/add", bookController.add)
  .get("/seed", bookController.seed)
  .put("/", bookController.update)
  .delete('/remove', bookController.remove)
  .get("/removeAll", bookController.removeAll)
  .get("/count", bookController.count)
  .get("/in", bookController.findByCategory);
module.exports = bookRouter;
