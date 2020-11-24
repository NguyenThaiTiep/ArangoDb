const express = require("express");
const userController = require("../controllers/user.controller");
const userRouter = express.Router();
userRouter.get("/", userController.getAll);
userRouter.get("/add", userController.add);
module.exports = userRouter;
