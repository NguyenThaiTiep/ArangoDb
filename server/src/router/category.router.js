const express = require("express");
const categoryController = require("../controllers/category.controller");
const categoryRouter = express.Router();
categoryRouter
  .get("/", categoryController.getAll)
  .get("/seed", categoryController.seed)
  .delete("/remove", categoryController.remove)
  .put("/", categoryController.update)
  .get("/removeAll", categoryController.removeAll)
  .get("/count", categoryController.count);
module.exports = categoryRouter;
