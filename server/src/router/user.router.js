const express = require("express");
const userController = require("../controllers/user.controller");
// const userController = require("../controllers/user.controller");
const userRouter = express.Router();
userRouter
  .get("/", userController.getAll)
  .get("/add", userController.add)
  .get("/removeAll", userController.removeAll);
module.exports = userRouter;
