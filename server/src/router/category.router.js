const express = require("express");
const categoryController = require("../controllers/category.controller");
const categoryRouter = express.Router();
categoryRouter

  .post("/add", categoryController.add)
  .get("/seed", categoryController.seed)
  .delete("/remove", categoryController.remove)
  .put("/", categoryController.update)
  .get("/removeAll", categoryController.removeAll)
  .get("/count", categoryController.count)
  .get("/", categoryController.getAll);
module.exports = categoryRouter;
