import * as express from "express";
import { billController } from "../controller/bill.controller";
import { bookController } from "../controller/book.controller";

const billRouter = express.Router();
billRouter
  .get("/", billController.getAll)
  .get("/seed", billController.seed)
  .delete("/remove", billController.remove)
  .put("/", billController.update)
  .get("/removeAll", billController.removeAll)
  .get("/count", billController.count);
export default billRouter;
