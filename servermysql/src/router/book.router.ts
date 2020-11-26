import * as express from "express";
import { bookController } from "../controller/book.controller";

const bookRouter = express.Router();
bookRouter
  .get("/", bookController.getAll)
  .post("/add", bookController.add)
  .get("/seed", bookController.seed)
  .delete("/remove", bookController.remove)
  .put("/", bookController.update)
  .get("/removeAll", bookController.removeAll)
  .get("/count", bookController.count);
export default bookRouter;
