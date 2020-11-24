const express = require("express");
const categoryController = require("../controllers/category.controller");
const categoryRouter = express.Router();
categoryRouter
  .get("/", categoryController.getAll)
  .get("/seed", categoryController.seed)
  .get("/removeAll", categoryController.removeAll)
  .get("/count", categoryController.count);
module.exports = categoryRouter;
