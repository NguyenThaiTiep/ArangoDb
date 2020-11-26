const express = require("express");
const billController = require("../controllers/bill.controller");
const billRouter = express.Router();
billRouter
  .get("/", billController.getAll)
  .post("/add", billController.add)
  .get("/seed", billController.seed)
  .delete("/remove", billController.remove)
  .put("/", billController.update)
  .get("/removeAll", billController.removeAll)
  .get("/count", billController.count);
module.exports = billRouter;
