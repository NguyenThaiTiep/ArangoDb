const express = require("express");
const billController = require("../controllers/bill.controller");

const billRouter = express.Router();
billRouter
  .get("/", billController.getAll)
  .get("/seed", billController.seed)
  .get("/removeAll", billController.removeAll)
  .get("/count", billController.count);
module.exports = billRouter;
